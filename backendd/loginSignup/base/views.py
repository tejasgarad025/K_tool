from django.shortcuts import render
from base.models import User
#from base.serializer import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer
from base.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
#my imports
from rest_framework.views import APIView
from .models import InputText,SaveText
from .serializer import InputSerializer,SaveTextSerializer
import sys
import os
from loginSignup.statics.saved_model.model_predictor import predict_pos_tags_for_sentence
from loginSignup.statics.saved_files.savePosScript import Save_Pos_tags
from loginSignup.statics.MU_uploads.saves.save_pos import save_uploadedfile_pos_tags
from django.http import HttpResponse,JsonResponse,FileResponse
from django.shortcuts import render

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Points to 'backend'
SAVE_PATH = os.path.join(BASE_DIR, 'loginSignup', 'statics', 'saved_files', 'pos_tags.txt')

"""class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer"""

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer 

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    return Response({
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name
    })

def dashboard(request):
    if request.method == 'GET':
        response = f"Hey {request.user}, Get Response"
        return Response({'response': response}, status = status.HTTP_200_OK)
    elif request.method == "POST":
        text = request.POST.get("text")
        response = f"Hey, {request.user}, {text}"
        return Response({'response': response}, status = status.HTTP_200_OK)
    
    return response({}, status = status.HTTP_400_BAD_REQUEST)

#changes are from here
@api_view(['GET'])
def list_inputs(request):
    inputs = InputText.objects.all()
    serializer = InputSerializer(inputs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_inputs(request):
    serializer = InputSerializer(data = request.data)
    if serializer.is_valid():
        sentence = serializer.validated_data['input_text']  # ✅ Get actual text from serializer
        predictions = predict_pos_tags_for_sentence(sentence)
        print(predictions)
        return Response({'predictions': predictions}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid input data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    """sentence = request.data.get("sentence","")
    if not sentence:
        return Response({"error": "No sentence provided"}, status=status.HTTP_400_BAD_REQUEST)
    print(sentence)
    predictions = predict_pos_tags_for_sentence(sentence)
    print(predictions)"""
    #return Response(predictions, status=status.HTTP_200_OK)

@api_view(['POST'])
def save_pos_data(request):
    serializer = SaveTextSerializer(data=request.data)
    if serializer.is_valid():
        print("saved")
        print(serializer.validated_data['Word'])
        print(serializer.validated_data['Tag'])
        Save_Pos_tags(serializer.validated_data['Word'],serializer.validated_data['Tag'])
        return Response({"message": "Data saved successfully!", "data": serializer.data}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def add_sentence(request):
    serializer = SaveTextSerializer(data=request.data)
    if serializer.is_valid():
        print("saved")
        print(serializer.validated_data['Word'])
        print(serializer.validated_data['Tag'])
        file_id = request.data.get('file_id')
        if not file_id:
            return Response({"error": "Missing file_id"}, status=400)
        save_uploadedfile_pos_tags(file_id,serializer.validated_data['Word'],serializer.validated_data['Tag'])
        return Response({"message": "Data saved successfully!", "data": serializer.data}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def download_pos_data(request):
    print("Attempting to access file at:", SAVE_PATH)  # Debugging

    if not os.path.exists(SAVE_PATH):
        print("File not found at:", SAVE_PATH)  # Debugging
        return JsonResponse({"error": "File not found"}, status=404)

    try:
        return FileResponse(open(SAVE_PATH, "rb"), as_attachment=True, filename="pos_tags.txt")
    except Exception as e:
        print(f"Error opening file: {e}")  # Debugging
        return JsonResponse({"error": f"Error opening file: {e}"}, status=500)


#user
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import UserSerializer
from .models import User

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            })
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#upload _user
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.conf import settings
from collections import deque
from .models import UploadedFile

UPLOAD_DIR = os.path.join(settings.BASE_DIR, "loginSignup", "statics", "MU_uploads","uploads")

file_queue = deque()  # Global queue for sentence processing

# Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Static Credentials
STATIC_USERNAME = "upload_user"
STATIC_PASSWORD = "staticpassword"

def upload_login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        if username == STATIC_USERNAME and password == STATIC_PASSWORD:
            request.session["is_authenticated"] = True
            return redirect("/upload/")  # 🔹 FIXED REDIRECT HERE

        return render(request, "login.html", {"error": "Invalid credentials"})

    return render(request, "login.html")


def upload_logout(request):
    request.session.flush()  # Clear session
    return redirect("upload_login")


def upload_file(request):
    if request.method == "POST":
        uploaded_file = request.FILES.get("file")
        if uploaded_file:
            # Ensure upload directory exists
            os.makedirs(UPLOAD_DIR, exist_ok=True)

            # Generate a unique filename
            file_path = os.path.join(UPLOAD_DIR, uploaded_file.name)

            with open(file_path, "wb+") as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)

            # Count lines in file
            with open(file_path, "r", encoding="utf-8") as f:
                lines = f.readlines()

            num_lines = len(lines)

            # Save file metadata in the database
            file_record = UploadedFile.objects.create(
                filename=uploaded_file.name,
                length=num_lines,
                is_completed=False
            )

            return render(request, "upload.html", {
                "message": "File uploaded successfully!",
                "file_size": num_lines,
                "file_id": file_record.id
            })

    return render(request, "upload.html")

def process_files(request):
    # Find an uncompleted file
    pending_files = UploadedFile.objects.filter(is_completed=False)

    if not pending_files.exists():
        return render(request, "process.html", {"message": "No work uploaded!"})

    # Get the first incomplete file
    file_record = pending_files.first()
    file_path = os.path.join(UPLOAD_DIR, file_record.filename)

    if not os.path.exists(file_path):
        return render(request, "process.html", {"message": "File not found!"})

    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # If queue is empty, refill with next 100 lines (with sentence and file_id)
    if not file_queue:
        file_queue.extend([(line.strip(), file_record.id) for line in lines[:100]])
        remaining_lines = lines[100:]

        # If no more lines left, mark file as completed
        if not remaining_lines:
            file_record.is_completed = True
            file_record.save()

    return render(request, "process.html", {
        "message": "File processing in progress!",
        "queue_size": len(file_queue),
        "file_id": file_record.id
    })


def get_next_sentence(request):
    if file_queue:
        sentence, file_id = file_queue.popleft()  # Pop both sentence and file_id
        return JsonResponse({"sentence": sentence.strip(), "file_id": file_id})  # Return both
    else:
        return JsonResponse({"sentence": "", "file_id": ""})  # Return empty string if queue is empty

"""import logging
logger = logging.getLogger(__name__)

def get_next_sentence(request):
    if file_queue:
        sentence = file_queue.popleft()
        pending_files = UploadedFile.objects.filter(is_completed=False)
        file_record = pending_files.first()

        if file_record is None:
            logger.warning("No uncompleted file found when trying to serve next sentence.")
            return JsonResponse({"error": "No pending file found!"}, status=404)

        return JsonResponse({"sentence": sentence.strip(), "file_id": file_record.id})
    else:
        logger.info("File queue is empty!")
        return JsonResponse({"sentence": "", "file_id": ""})"""
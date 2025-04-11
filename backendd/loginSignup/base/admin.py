from django.contrib import admin
"""from base.models import User, Profile

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name']

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
"""

#user
from .models import User

admin.site.register(User)

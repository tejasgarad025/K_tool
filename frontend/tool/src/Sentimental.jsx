import React, {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; 
import logout from './logout.svg'
import {useNavigate} from "react-router-dom"
import useAuth from './useAuth';  

function Sentimental() {
    const navigate = useNavigate();
    const handlePage = (event)=>{
        const selectedPage = event.target.value;
        if(selectedPage){
        navigate(selectedPage);
        }
    }

    return (
        <div className="container">
            <Header />
            <MainContent handlePage={handlePage}/>
        </div>
    );
}

function Header() {
    const navigate = useNavigate();
    const HandleLogout=()=>{ 
        alert('Logginng out')
        navigate('/login')
    }

    return (
        <header className="header">
        <nav className="nav-links">
          <a href="/Sentimental">Home</a>
          <a href="/about">About Us</a>
          <a href="/Sentimental">Refresh</a>
          <a href="/Performance">Performance</a>
          <a href="#">Report Bug</a>
        </nav>

        <div className="logout-button" onClick={() => HandleLogout() }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logout-icon">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </div>
      </header>
    );
}

function MainContent({handlePage}) {
    return (
        <main className="main-content">
            <Method handlePage={handlePage}/>
            <UserInfo />
            <TaggingSection />
        </main>
    );
}

function Method({handlePage}){
    return (
    <div className="tagging-section">
    <div>
    <label>Method</label>
    <select onChange={handlePage}>
        <option value='/sentimental'>Sentimental Analysis</option>
        <option value='/home'>Part Of Speech (POS)</option>
        <option value='/namedannotation'>Named Entity Recognition (NER)</option>
    </select>
</div>
</div>
)
}

function UserInfo() {
   const user = useAuth();
    return (
        <div>
            { user? (
                <p><b>Current user :</b> {user.username? user.username:"not available"}</p>
            ):(
                <p>not logged in</p>
            )

            }
        </div>
    );
}

function TaggingSection() {
    
    const [text, setText] = useState("");

    const handleOnchange =(e)=>{
        setText(e.target.value)
    }
    
    const handleClearTag=()=>{
        setText('');
    }
    
    const handleSave=()=>{
        toast.success("Saved successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
    }

    const handleTagClick=(tag)=>{
        let updatedText = text.replace(/\[Positive\]|\[Negative\]|\[Neutral\]/g, "").trim();
        setText(updatedText + ` [${tag}]`)
    }

    return (
        <div className="tagging-section">
            <div className="tagging-header">
                <div>
                    <label>language</label>
                    <select>
                        <option>Konkani</option>
                        <option>English</option>
                        <option>Hindi</option>
                    </select>
                
                </div>
                <div>
                    <label>Method</label>
                    <select>
                        <option>CLIFT NER</option>
                        <option>Method 2</option>
                    </select>
                
                </div>
            </div>
            <div className="textareas">
                <textarea className='text-2' onChange={handleOnchange} value={text}></textarea>
            </div>
        
            <div className="buttons"> 
                <button onClick={handleClearTag}>Clear Text</button>
                {/* <button>Preview</button>
                <button>Next</button> */}
                <button className="tag-sentence">Tag Sentence</button>
                <button onClick={handleSave} className="save">Save</button>
            </div>

            <div className='tag-list'><p>Tag legends</p>
                <div className='tags-sa'>
                <button onClick={()=>handleTagClick("Positive")} className='tag-green'>Positive</button>
                <button onClick={()=>handleTagClick("Negative")} className='tag-red'>Negative</button>
                <button onClick={()=>handleTagClick("Neutral")} className='tag-yellow'>Neutral</button>
            </div> 
            </div>
      
        </div>
    );
}

export default Sentimental;
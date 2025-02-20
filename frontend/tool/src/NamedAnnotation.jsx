import React, {useState} from 'react';
import './App.css'; 
import logout from './logout.svg'
import {useNavigate} from "react-router-dom"
import useAuth from './useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NamedAnnotation() {
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
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Refresh</a>
          <a href="#">Performance</a>
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

function MainContent({handlePage, text, setText}) {
    return (
        <main className="main-content">
            <Method handlePage={handlePage}/>
            <UserInfo />
            <TaggingSection/>
        </main>
    );
}

function Method({handlePage}){
    return (
    <div className="tagging-section">
    <div>
    <label>Method</label>
    <select onChange={handlePage}>
        <option value='/namedannotation'>Named Entity Recognition (NER)</option>
        <option value='/sentimental'>Sentimental Analysis</option>
        <option value='/home'>Part Of Speech (POS)</option>
    </select>
</div>
</div>
)
}

function UserInfo() {
    const user = useAuth();
    return (
        <div >
            {user?(
                <p><b>Current user :</b> {user.username? user.username:"not available"}</p>
            ):(
                <p>not logged in</p>
            )}
        </div>
    );
}

function TaggingSection() {

    const tags = [
        { text: 'Person', color: 'tag-green' },
        { text: 'Location', color: 'tag-blue' },
        { text: 'organization', color: 'tag-orange' },
        { text: 'Language', color: 'tag-red' },
        { text: 'Religion', color: 'tag-teal' },
        { text: 'Game', color: 'tag-yellow' },
        { text: 'Literature', color: 'tag-purple' },
        { text: 'B-Person', color: 'tag-dark-yellow' },
        { text: 'B-Noun', color: 'tag-dark-blue' },
        { text: 'B-Festival', color: 'tag-dark-orange' },
        { text: 'B-Language', color: 'tag-dark-red' },
        { text: 'B-Religion', color: 'tag-dark-teal' },
        { text: 'B-Game', color: 'tag-dark-yellow' },
        { text: 'Person', color: 'tag-green' },
        { text: 'Noun', color: 'tag-blue' },
        { text: 'Festival', color: 'tag-orange' },
        { text: 'Language', color: 'tag-red' },
        { text: 'Religion', color: 'tag-teal' },
        { text: 'Game', color: 'tag-yellow' },
        { text: 'Doubt', color: 'tag-light-yellow' },
        { text: 'Literature', color: 'tag-purple' },
        { text: 'B-Person', color: 'tag-dark-yellow' },
        { text: 'B-Noun', color: 'tag-dark-blue' },
        { text: 'B-Festival', color: 'tag-dark-orange' },
        { text: 'B-Language', color: 'tag-dark-red' },
        { text: 'B-Religion', color: 'tag-dark-teal' },
        { text: 'B-Game', color: 'tag-dark-yellow' },
    ];

    const [text, setText] = useState("")
    const handleClearTag=()=>{
        setText("");
    }

    const handleSplit=()=>{
        setText(prevText => {
        const splitWords = (prevText || "").trim().split(/\s+/).join("\n");
        return splitWords;
    }) }

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
        <div className='tagging-container'>

        <div className='textarea-display'>
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

            <div className="textareas" >
                <textarea className='text-3' 
                value={text} 
                onChange={(e)=>setText(e.target.value)}>
                </textarea>            
            </div>
            
            <div className="buttons">
                <button onClick={handleClearTag}>Clear Tag</button>
                <button>Preview</button>
                <button onClick={handleSplit}>Next</button>
                <button className="tag-sentence">Tag Sentence</button>
                <button onClick={handleSave} className="save">Save</button>
            </div>
            </div>

        </div>


            <div >
                <div className="tag-list"><p>Tag legends</p>
                <div className="tags-na">
                <button onClick={()=>handleTagClick("Location")} className='tag-green'>Location</button>
                <button onClick={()=>handleTagClick("Organization")} className='tag-red'>Organization</button>
                <button onClick={()=>handleTagClick("Person")} className='tag-yellow'>Person</button>
                <button onClick={()=>handleTagClick("Date")} className='tag-green'>Date</button>
                <button onClick={()=>handleTagClick("year")} className='tag-yellow'>year</button>
                <button onClick={()=>handleTagClick("Quantity")} className='tag-red'>Quantity</button>
                <button onClick={()=>handleTagClick("Percentile")} className='tag-green'>Percentile</button>
                <button onClick={()=>handleTagClick("Timex number")} className='tag-yellow'>Timex number</button>
                </div>
                </div>
            </div>

    </div>
    );
}

export default NamedAnnotation;

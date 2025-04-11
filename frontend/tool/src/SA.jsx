import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SA() {
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

export default SA;
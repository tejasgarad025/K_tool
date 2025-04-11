import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function NER() {
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

export default NER;
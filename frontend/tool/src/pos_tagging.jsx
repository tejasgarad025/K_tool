import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function POS_Tagging() {
  const [konkaniInput, setKonkaniInput] = useState("");
  const [processedLabels, setProcessedLabels] = useState([]);
  const [predictedValue, setPredictedValue] = useState([]);
  const [nullValue, setNullValue] = useState([]);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(null);

  const posTags = [
    "CC_CCD", "CC_CCS", "DM_DMD", "DM_DMI", "DM_DMQ", "DM_DMR", "JJ", "N_NN", "N_NNP", "N_NNV", "N_NST", "PR_PRC", "PR_PRF", "PR_PRI", "PR_PRL", "PR_PRP", "PR_PRQ", "PSP", "QT_QTC", "QT_QTF", "QT_QTO", "RB", "RD_ECH", "RD_PUNC", "RD_RDF", "RD_SYM", "RD_UNK", "RP_CL", "RP_INJ", "RP_INTF", "RP_NEG", "RP_RPD", "V_VAUX_VF", "V_VAUX_VNF", "V_VM", "V_VM_VF", "V_VM_VINF", "V_VM_VNF", "V_VM_VNG",
  ];

  const clearInput = () => {
    console.log("Clearing input fields...");
    setKonkaniInput("");
    setProcessedLabels([]);
    setPredictedValue([]);
    setNullValue([]);
  };

  const handleInputChange = (event) => {
    setKonkaniInput(event.target.value);
  };

  const handleSentClick = async () => {
    if (konkaniInput.trim() !== "") {
      try {
        const response = await axios.post("http://127.0.0.1:8000/inputs/add", { input_text: konkaniInput });
        if (response.data.predictions) {
          const words = response.data.predictions.map(item => item[0]);
          const labels = response.data.predictions.map(item => item[1]);
          const nullList = new Array(words.length).fill(null);
          setProcessedLabels(words);
          setPredictedValue(labels);
          setNullValue(nullList);
        }
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
      }
    }
  };

  const handleLabel1DoubleClick = (index) => {
    setSelectedLabelIndex(index);
  };

  const handlePosButtonClick = (tag) => {
    if (selectedLabelIndex !== null) {
      const updatedPredictedValue = [...predictedValue];
      const updatedNullValue = [...nullValue];
      updatedPredictedValue[selectedLabelIndex] = tag;
      updatedNullValue[selectedLabelIndex] = tag;
      setPredictedValue(updatedPredictedValue);
      setNullValue(updatedNullValue);
      setSelectedLabelIndex(null);
    }
  };

  const handleClearTags = () => {
    setPredictedValue(new Array(processedLabels.length).fill(null));
    setNullValue(new Array(processedLabels.length).fill(null));
  };

  const handleTagSentence = () => {
    setNullValue([...predictedValue]);
  };

  const handleSave = async () => {
    if (processedLabels.length !== predictedValue.length || nullValue.includes(null)) {
      alert("Error: Every word must have a POS tag before saving.");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/save-pos", { Word: processedLabels, Tag: predictedValue });
      console.log("Response:", response.status);
      if (response.status === 201) {
        console.log("Data saved successfully:", response.data);
        clearInput();
      } else {
        console.warn("Unexpected response:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  const handleDownload = () => {
    fetch("http://127.0.0.1:8000/download-pos")
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "pos_tags.txt";
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => console.error("Download Error:", error));
  };

  return (
    <div className="tagging-section"
      style={{ 
        display: "flex", 
        flexDirection: "row", 
        paddingLeft: "20px", 
        border: "2px solid black",
        }}
    >
      <div className="section1">
        <div className="textareas">
          <textarea
            value={konkaniInput}
            onChange = {handleInputChange}
            placeholder="Type your sentence here"
            className="text-1"
            style={{ 
              fontSize: "medium",
              fontFamily:
                "'Noto Sans Devanagari', 'Mangal', 'Kokila', 'Arial Unicode MS', sans-serif", 
            }} 
          >
          </textarea>
          <div style={{ marginBottom: "30px"}}>
            <button className="btn-pos" onClick={clearInput}>Clear</button>
            <button className="btn-pos" onClick={handleSentClick}>Sent</button>
          </div>
          <div
            style={{
              backgroundColor: "white",
              height: "300px",
              width: "800px",
              border: "2px solid black",
              marginBottom: "10px",
              padding: "10px",
              overflowY: "scroll",
            }}
          >
            {processedLabels.map((word, index) => (
            <div 
              key={index} 
              style={{ display: "flex", gap: "10px", marginBottom: "5px"}}
            >
              <label 
              style={{
                fontSize: "small",
                padding: "5px",
                backgroundColor: "white",
                cursor: "pointer",
                border: "1px solid black",
              }}
              onDoubleClick={() => handleLabel1DoubleClick(index)}
              >
                {word}
              </label>
              <label 
                style={{ 
                  fontSize: "small",
                  padding: "5px",
                  backgroundColor: 
                    selectedLabelIndex === index 
                    ? "blue" 
                    : nullValue[index] !== null ? "lightblue" : "grey", 
                  color: "white",
                  cursor: "pointer",
                  border: "1px solid black",
                }}
              >
                {predictedValue[index]}
              </label>
            </div>
            ))}
          </div>
          <div>
            <button className="btn-pos" onClick={handleClearTags}>Clear Tags</button>
            <button className="btn-pos" onClick={handleTagSentence}>Tag Sentence</button>
            <button className="btn-pos" onClick={handleSave}>Save</button>
            <button className="btn-pos" onClick={handleDownload}>Download</button>
          </div>
        </div>
      </div>
      <div className="section2">
        <div className="textareas-1-2">
          <div className="tag-list"
            style={{ 
              backgroundColor: "white",
              height: "580px",
              width: "170px",
              border: "2px solid black",
              marginBottom: "30px",
              marginLeft: "30px",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "10px",
              overflowY: "scroll", 
            }}
          >
            {posTags.map((tag, index) => (
              <button 
                key={index} 
                style={{
                  width: "100%",
                  fontSize: "large",
                  padding: "5px",
                  backgroundColor: "lightblue",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => handlePosButtonClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default POS_Tagging;
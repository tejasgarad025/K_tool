import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function POS_Tagging_server() {
  const [konkaniInput, setKonkaniInput] = useState("");
  const [message, setmessage] = useState("");
  const [file_id, setfile_id] = useState("");
  const [processedLabels, setProcessedLabels] = useState([]);
  const [predictedValue, setPredictedValue] = useState([]);
  const [nullValue, setNullValue] = useState([]);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(null);

  const posTags = [
    "CC_CCD", "CC_CCS", "DM_DMD", "DM_DMI", "DM_DMQ", "DM_DMR", "JJ",
    "N_NN", "N_NNP", "N_NNV", "N_NST", "PR_PRC", "PR_PRF", "PR_PRI", "PR_PRL",
    "PR_PRP", "PR_PRQ", "PSP", "QT_QTC", "QT_QTF", "QT_QTO", "RB", "RD_ECH",
    "RD_PUNC", "RD_RDF", "RD_SYM", "RD_UNK", "RP_CL", "RP_INJ", "RP_INTF",
    "RP_NEG", "RP_RPD", "V_VAUX_VF", "V_VAUX_VNF", "V_VM", "V_VM_VF",
    "V_VM_VINF", "V_VM_VNF", "V_VM_VNG",
  ];

  const clearInput = () => {
    console.log("Clearing input fields...");
    setKonkaniInput("");
    setProcessedLabels([]);
    setPredictedValue([]);
    setNullValue([]);
    setfile_id("");
    setmessage("");
  };

  // Fetch sentence from the backend on component mount
  const fetchSentence = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get-sentence/");
      console.log("Fetched sentence response:", response.data); // Debugging line
      if (response.data && response.data.sentence && response.data.file_id) {
        setKonkaniInput(response.data.sentence);
        setfile_id(response.data.file_id);
      } else if (!response.data.file_id) {
        setmessage("NO file uploaded by uploader");
      } else{
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching sentence:", error.response ? error.response.data : error.message);
    }
  };
  
  useEffect(() => {
    fetchSentence();
  }, []);
  
  /*const handleNextClick = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/sentence/return", { sentence: konkaniInput });
      clearInput();
      toast.success("Sentence sent back to queue.");
    } catch (error) {
      console.error("Error returning sentence:", error);
      toast.error("Failed to return sentence.");
    }
    html part             <button className="btn-pos" onClick={handleNextClick}>Next</button>
  };*/

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
    if (!konkaniInput || processedLabels.length === 0) {
      alert("No sentence to save.");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/add_sentence", {file_id: file_id, Word: processedLabels, Tag: predictedValue });
      console.log("Response:", response.status);
      if (response.status === 201) {
        console.log("Data saved successfully:", response.data);
        toast.success("Tagged sentence saved!");
        clearInput();
        fetchSentence();
      } else {
        console.warn("Unexpected response:", response.status);
        toast.error("Failed to save tagged sentence.");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      toast.error("Failed to save tagged sentence.");
    }
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
        <p className="message"
          style={{
            fontSize: "18px",
            color: "red",
          }}
        >
          { message }
        </p>
        <div className="textareas">
          <div
            className="text-1"
            style={{ 
              fontSize: "medium",
              fontFamily:
                "'Noto Sans Devanagari', 'Mangal', 'Kokila', 'Arial Unicode MS', sans-serif", 
              backgroundColor: "white",
              padding: "10px",
              border: "2px solid black",
              minHeight: "50px",
              maxWidth: "800px"
            }} 
          >
            {konkaniInput ? konkaniInput : "Loading sentence..."}
          </div>
          <div style={{ marginBottom: "30px"}}>
            <button className="btn-pos" onClick={handleSentClick}>Analyze</button>          
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

export default POS_Tagging_server;


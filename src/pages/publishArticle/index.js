import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";
import "./style.css";

function Publish() {
  const [previewImage, setPreviewImage] = useState("");
  return (
    <div className="publishHome">
      <Header />
      <Typography
        style={{
          marginRight: "48.2%",
          marginBottom: "10px",
          color: "black",
        }}
      >
        TITLE
      </Typography>
      <TextField
        variant="standard"
        required
        rows={1}
        InputProps={{ disableUnderline: true }}
        style={{
          width: "50%",
          padding: '8px',
          marginBottom: "20px",
          background: "rgb(238, 238, 238)",
          border: "none",
        }}
        maxRows={4}
      />
      <Typography
        style={{
          marginRight: "43.9%",
          marginBottom: "10px",
          color: "black",
        }}
      >
        DESCRIPTION
      </Typography>
      <TextField
        variant="standard"
        multiline
        required
        rows={10}
        InputProps={{ disableUnderline: true, border: "none" }}
        style={{
          width: "50%",
          marginBottom: "20px",
          padding: '8px',
          background: "rgb(238, 238, 238)",
        }}
        maxRows={4}
      />
      <Typography
        style={{
          marginRight: "44%",
          marginBottom: "5px",
          color: "black",
        }}
      >
        Upload Image
      </Typography>
      <TextField
        variant="standard"
        accept="image/png,image/jpg"
        className="createMovieThumbnail_input"
        type="file"
        InputProps={{ disableUnderline: true }}
        style={{ paddingBottom: "10px", marginRight: "29%" }}
        required
        name="thumbnail"
        // onChange={onInputChange}
      />
      <img
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        width="50%"
        height="240px"
        src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
      />
    </div>
  );
}

export default Publish;

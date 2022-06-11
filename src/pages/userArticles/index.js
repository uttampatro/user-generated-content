import React, { useState } from "react";
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./style.css";
import { TablePagination } from "@mui/material";

function Articles() {
  const [currentPage, setCurrentPage] = useState(0);
  const [studentPerPage, setStudentPerPage] = useState(4);
  const [totalCount, setTotalCount] = useState(0);
  return (
    <div className="articles">
      <Header />
      <div className="articlesBody">
        <div>
          <hr style={{ margin: "10px 200px" }} />
          <h3 style={{ padding: "5px", fontFamily: "-moz-initial" ,}}>
            YOUR SUBMITTED ARTICLES
          </h3>
          <hr style={{ margin: "10px 200px" }} />
        </div>
        <div>
          <div className="articlesBodyContent">
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingLeft: "200px",
              }}
            >
              <img
                style={{
                  paddingTop: "15px",
                  width: "150px",
                  height: "100px",
                }}
                src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill"
              />
              <div
                style={{
                  paddingLeft: "20px",
                  paddingTop: "15px",
                  textAlign: "justify",
                }}
              >
                <h3>10 React Interview Questions for 2020</h3>
                <p style={{ paddingTop: "10px" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting
                  <br />
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s ....
                </p>
              </div>
            </div>
            <div
              style={{
                padding: "30px",
                paddingRight: "170px",
                cursor: "pointer",
              }}
            >
              <EditIcon style={{ padding: "20px" }} />
              <DeleteIcon style={{ padding: "20px" }} />
            </div>
          </div>
          <hr style={{ margin: "10px 200px" }} />
        </div>
        <div className="articles_footer">
          <TablePagination
            count={totalCount}
            page={currentPage}
            // onPageChange={handleChangePage}
            rowsPerPage={studentPerPage}
            // onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Articles;

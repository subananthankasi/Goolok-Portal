import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../Api/api";
import axios from "axios";
import DataTable from "react-data-table-component";
import customStyle from "../../../Utils/tableStyle";
import { DateFormatcustom } from "../../../Utils/DateFormatcustom";
import Spinner from "react-bootstrap/Spinner";

export const RedoModel = ({ isOpen, closeModal, id }) => {

  const columns = [
    {
      name: "S.no",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Redo Date",
      selector: (row) => DateFormatcustom(row.notif_time),
      sortable: true,
      width: "150px",
    },
    {
      name: "Remark",
      selector: (row) => row.notif_content,
      sortable: true,
      // wrap: true,
    }
  ];

  const [data, setData] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/enquiryreport/${id.id}/edit`
        );
        setData(response.data);
        setLoadingPage(false)
      } catch (error) {
        setLoadingPage(false)

      }
    };
    if (id && isOpen) {
      setLoadingPage(true)
      fetchData();
    }
  }, [id,isOpen]);

  return (
    <>
      <div
        className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <h4 className="page_subheading m-3">Redo Details</h4>
              <button
                type="button"
                className="close closebutton"
                onClick={() => { closeModal(); }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr className="m-0" />
            <div className="card-body p-3">
              <form>

                {loadingPage ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}>
                    <Spinner className="mt-auto" />
                  </div>
                ) : (

                  <div className="row">
                    <DataTable
                      persistTableHead={true}
                      columns={columns}
                      data={data}
                      customStyles={customStyle}
                      pagination
                      // selectableRows
                      fixedHeader
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

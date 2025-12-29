import React from "react";
import customStyle from "../../Utils/tableStyle";
import DataTable from "react-data-table-component";

const FollowUpView = ({ isOpen, closeModal }) => {
    const columns = [
        {
          name: "S.no",
          cell: (row, index) => index + 1,
          sortable: true,
        },
        {
          name: "Date",
          selector: (row) => row.created_at,
          sortable: true,
        },
        {
          name: "FollowUp date",
          selector: (row) => row.date,
          sortable: true,
        },
        {
          name: "Remark",
          selector: (row) => row.remark,
          sortable: true,
          wrap:true
        }  
      ];

      const data = [
        {
          created_at: "2024-10-01",
          date: "2024-10-15",
          remark: "Initial follow-up completed",
        },
        {
          created_at: "2024-10-05",
          date: "2024-10-20",
          remark: "Scheduled for next review",
        }
      ];
      
  return (
    <div
      className={`modal modal-overlay ${isOpen ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h4 className="page_subheading m-3">FollowUp Report</h4>
            <button
              type="button"
              className="close closebutton"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <hr className="m-0"/>
          <div className="card-body p-3">
            <DataTable
                persistTableHead={true}
                columns={columns}
                data={data}
                customStyles={customStyle}
                pagination 
                fixedHeader
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpView;

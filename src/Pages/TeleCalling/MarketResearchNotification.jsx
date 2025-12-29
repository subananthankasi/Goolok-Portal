import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Reorder,
  Inject,
  Sort,
  Toolbar,
  Filter,
  Edit,
} from "@syncfusion/ej2-react-grids";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function MarketResearchNotification() {
  const filterSettings = { type: "Excel" };
  const toolbar = ["Add", "Edit", "Delete", "Update", "Cancel"];
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };

  const data = [
    {
      sno: 1,
      reference: "Property A",
      loc: "12.9716, 77.5946",
      price: "2024-01-15",
      contact: "123-456-7890",
      direction: "North",
      roadwidth: "15 ft",
      distance: "2 km",
    },
    {
      sno: 2,
      reference: "Property B",
      loc: "13.0827, 80.2707",
      price: "2024-02-10",
      contact: "987-654-3210",
      direction: "East",
      roadwidth: "20 ft",
      distance: "5 km",
    },
    {
      sno: 3,
      reference: "Property C",
      loc: "19.0760, 72.8777",
      price: "2024-03-05",
      contact: "555-123-4567",
      direction: "South",
      roadwidth: "12 ft",
      distance: "3.5 km",
    },
  ];
  const navigate = useNavigate();

  return (
    <>
      <div className="section">
        <div className="container-fluid">
        <div className="col-12">
                  <div className="d-flex justify-content-end">
                    <div
                      className="p-2 d-flex align-items-center mb-2 text-white"
                      style={{
                        cursor: "pointer",
                        background: "#2f4f4f",
                        clipPath: `polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)`,
                        justifyContent: "center",
                        width: "100px",
                        fontSize: "13px",
                      }}
                      onClick={() => navigate(-1)}
                    >
                      <ArrowBackIcon /> back
                    </div>
                   </div> 
                </div>

          <div className="col-12 mt-2">
            <div className="card shadow border-0">
              <div className="card shadow border-0 p-4">
                <h6>Market Research </h6>
                <hr />

                <GridComponent
                  dataSource={data}
                  allowReordering={true}
                  allowSorting={true}
                  editSettings={editSettings}
                  allowFiltering={true}
                  filterSettings={filterSettings}
                  toolbar={toolbar}
                >
                  <ColumnsDirective>
                    <ColumnDirective
                      field="sno"
                      headerText="S.No"
                      width="100"
                      isPrimaryKey={true}
                    ></ColumnDirective>
                    <ColumnDirective
                      field="reference"
                      headerText="Reference property"
                      width="100"
                      validationRules={{ required: true }}
                    ></ColumnDirective>
                    <ColumnDirective
                      field="loc"
                      headerText="Lat, Long"
                      width="100"
                      validationRules={{ required: true }}
                    />
                    <ColumnDirective
                      field="price"
                      headerText="Price"
                      width="100"
                      validationRules={{ required: true }}
                    />
                    <ColumnDirective
                      field="contact"
                      headerText="Contact no"
                      width="100"
                      validationRules={{ required: true }}
                    ></ColumnDirective>
                    <ColumnDirective
                      field="direction"
                      headerText="Direction"
                      width="100"
                      validationRules={{ required: true }}
                    ></ColumnDirective>
                    <ColumnDirective
                      field="roadwidth"
                      headerText="Road width"
                      width="100"
                      validationRules={{ required: true }}
                    ></ColumnDirective>
                    <ColumnDirective
                      field="distance"
                      headerText="Distance"
                      width="100"
                      validationRules={{ required: true }}
                    ></ColumnDirective>
                  </ColumnsDirective>
                  <Inject services={[Reorder, Sort, Toolbar, Filter, Edit]} />
                </GridComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketResearchNotification;

import React from "react";
import Topbar from "../../Components/topbar/topbar";
import Footerbar from "../../Components/footer/footer";
import "./dashboardCss.css";
import { Chart } from "react-google-charts"; 

function Dashboard() {
  const data = [
    ["Task", "Hours per Day"],
    ["Live Property", 450],
    ["Cancel Property", 695],
    ["Closed Property", 270],
  ];

  const options = {
    title: "Property Activities",
  };

  const PaymentData = [
    ["Months", "Success Payments", "Failed Payments","Cancel Payments"],
    ["January", 8175000, 8008000,3444452],
    ["February", 3792000, 3694000,4444452],
    ["March", 2695000, 2896000,4744452],
    ["April", 2099000, 1953000,4444452],
    ["May", 1526000, 1517000,4444452],
  ];

  const optionPayments = {
    title: "Payments",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Counts",
      minValue: 0,
    },
    vAxis: {
      title: "Months",
    },
  };
  return (
    <>
      {/* <Topbar /> */} 
      <section className="section">
        <div className="container-fluid">
          {/* <div className="page_heading">
            <h5>Dashboard</h5>
          </div>
          <hr /> */}

          <div className="row g-6 mb-6">
            <div className="col-xl-3 col-sm-6 col-12 mt-2">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col">
                      <span className="text-muted d-block mb-2">
                        New Property
                      </span>
                      <span className="h3 font-bold mb-0">45</span>
                    </div>
                    <div className="col-auto">
                      <div className="text-white bg-success rounded-circle background-light-icons">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-building-check"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514" />
                          <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1z" />
                          <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 mb-0 text-sm">
                    <span className="badge bg-success  text-success me-2 background-light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-up-short"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                        />
                      </svg>
                      13%
                    </span>
                    <span className="font_size1">
                      Since last month
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mt-2">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <span className="text-muted d-block mb-2">
                        Owners Agreements
                      </span>
                      <span className="h3 font-bold mb-0">215</span>
                    </div>
                    <div className="col-auto">
                      <div className="text-white bg-danger rounded-circle background-light-icons">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          class="bi bi-hand-thumbs-up"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 mb-0 text-sm">
                    <span className="badge bg-success  text-success me-2 background-light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-up-short"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                        />
                      </svg>
                      23%
                    </span>
                    <span className="font_size1">
                      Since last month
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-12 mt-2">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <span className="text-muted d-block mb-2">
                        Live Property
                      </span>
                      <span className="h3 font-bold mb-0">455</span>
                    </div>
                    <div className="col-auto">
                      <div className="text-white bg-info rounded-circle background-light-icons">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          class="bi bi-patch-check"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"
                          />
                          <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 mb-0 text-sm">
                    <span className="badge bg-success  text-success me-2 background-light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-up-short"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                        />
                      </svg>
                      23%
                    </span>
                    <span className="font_size1">
                      Since last month
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-12 mt-2">
              <div className="card shadow border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <span className="text-muted d-block mb-2">
                        Cancel Property
                      </span>
                      <span className="h3 font-bold mb-0">174</span>
                    </div>
                    <div className="col-auto">
                      <div className="text-white bg-warning rounded-circle background-light-icons">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          class="bi bi-x-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 mb-0 text-sm">
                    <span className="badge bg-success  text-success me-2 background-light">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-up-short"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                        />
                      </svg>
                      8%
                    </span>
                    <span className="font_size1">
                      Since last month
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* chart start  */}
            <div className="col-sm-6 col-12 mt-4">
              <div className="card shadow border-0">
                <Chart
                  chartType="PieChart"
                  data={data}
                  options={options}
                  width={"100%"}
                  height={"400px"}
                />
              </div>
            </div>


            <div className="col-sm-6 col-12 mt-4">
              <div className="card shadow border-0">
                <Chart
                  chartType="BarChart"
                  data={PaymentData}
                  options={optionPayments}
                  width={"100%"}
                  height={"400px"}
                />
              </div>
            </div>

          </div>
        </div>
      </section> 
    </>
  );
}

export default Dashboard;

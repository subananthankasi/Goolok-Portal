import React, { useRef, useState } from "react";
 

function Amenities() {
  

  return (
    <div>
     

      <div className="row">
        <h6 className="mt-3 mb-3">Indoor Amenities</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Closet or other storage space
            </label>
          </div>
        </div>
       
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Sink garbage disposal
            </label>
          </div>
        </div>
        
   
       
       
    
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Air conditioning
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Deck or patio
            </label>
          </div>
        </div>
    
      
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Hardwood floors
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              High-end appliances or fixtures
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Energy-efficient appliances
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              In-unit laundry machines
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Large windows
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Private balcony
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Windows with views
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Walk-in closets
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Smart Home
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Security Systems and Interlock
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Intercom Systems
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Extra Storage Place
            </label>
          </div>
        </div>

        {/* Recreational Amenities / Landscape Amenities ---------------------------------------------------------> */}
        <h6 className="mt-4 mb-3">
          Recreational Amenities / Landscape Amenities{" "}
        </h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Barbecue or outdoor kitchen
            </label>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Clubhouse
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Community events
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Community garden
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Community kitchen
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Gym or fitness center
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Jogging or walking paths
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Media room
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Playground
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Sport courts
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Swimming pool
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Rooftop lounge
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Yoga room
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Multipurpose hall
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Gym facility
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Stepped Seating
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Outdoor gathering lawn
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Tree plaza
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Senior citizen Seating
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Reflexology Pathway
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Pergola with swing seating
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              In ground trampoline
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Interactive floor games for kids
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Kids Jungle Gym
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Bicycle Racks
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Walking or Jogging tracks
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Air Filling Station
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Aqua Auditory Zone
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Sensory Garden
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Meditation Deck
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Mobile Charging station
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Barbeque Plaza
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Mini Golf
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Dormitories for maids
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              EV Charging bay
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              CCTV Survillence
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Multi speciality Clinic
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Rooftop Garden
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Saloon
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Private spa
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Super markets
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Play Schools
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Pharmacy
            </label>
          </div>
        </div>




   {/* Kitchen Appliances: -----------==================----------------------=-------------------------------> */}
   <h6 className="mt-4 mb-3">Kitchen Appliances</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Refrigerator
            </label>
          </div>
        </div>
      
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Freezer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Dishwasher
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Oven
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Microwave
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Cooktop/Stove
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Rangehood/Exhaust Fan
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Wine Cooler
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Ice Maker
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Garbage Disposal Unit
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Toaster
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Toaster Oven
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Kettle
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Coffee Maker
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Espresso Machine
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Blender
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Food Processor
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Stand Mixer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Bread Maker
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Rice Cooker
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Slow Cooker
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Pressure Cooker
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Sous Vide Machine
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Grill
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Deep Fryer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Juicer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Water Dispenser
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Can Opener
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Vacuum Sealer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Induction Cooktop
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Cabinets and Drawers
            </label>
          </div>
        </div>
        


  {/*  LAUNDRY ROOM : -----------==================----------------------=-------------------------------> */}
  <h6 className="mt-4 mb-3"> Laundry Room </h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Washing Machine
            </label>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Clothes Dryer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Washer-Dryer Combo
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Ironing Machine
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Laundry Pedestal
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Clothes Steamer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Portable Washing Machine
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Drying Cabinet
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Heated Drying Rack
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Laundry Sink
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Iron
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Automatic Clothes Folder
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Dehumidifier
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Air Purifier
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Lint Remover
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Laundry Cart
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Water Softener
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Laundry Basket with Built-in Dryer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Garment Press
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Vacuum Cleaner
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Steam Cleaner
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Fabric Shaver
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Handheld Steamer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Laundry Sanitizer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Laundry Soap Dispenser
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Hanging Drying Rack
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Dryer Balls
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Laundry Odor Eliminator
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Washing Machine Cleaner
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Dryer Vent Cleaner
            </label>
          </div>
        </div>






   


{/* Bathroom Features -----------==================----------------------=-------------------------------> */}
<h6 className="mt-4 mb-3">Bathroom Features</h6>
        <hr />

        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Heated Towel Rail
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Shower
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Bathroom Heater
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Dehumidifier
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Hairdryer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Toothbrush
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Razor
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Water Flosser
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Facial Brush
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Bathroom Scale
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Hand Dryer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Steam Shower
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Whirlpool Bathtub
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Jacuzzi
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Shower Panel System
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Shower Radio
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Smart Mirror
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Towel Warmer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Bidet
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Bathroom Fan/Exhaust Fan
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Soap Dispenser
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Toothbrush Sanitizer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Facial Steamer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Foot Spa
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Nail File
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Hair Trimmer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Infrared Sauna
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              LED Shower Head
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Bathroom TV
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Toilet Seat Warmer
            </label>
          </div>
        </div>
 


{/* Living Room -----------==================----------------------=-------------------------------> */}
<h6 className="mt-4 mb-3">Living Room Features</h6>
        <hr />

        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Air Conditioner
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Heater
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Dehumidifier
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Humidifier
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Air Purifier
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Fireplace
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Ceiling Fan
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Fan
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Portable Air Conditioner
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Space Heater
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Recliner
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Robotic Vacuum Cleaner
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Steam Mop
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Ottoman or Poufs
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Dining Table and Chairs
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Coffee Table 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Smart Home Hub
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Window Blinds
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Curtain Track
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Aroma Diffuser
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Foot Massager
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Massage Chair
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Side Tables
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Smart TV
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Streaming Device
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Projector Screen
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              DVD/Blu-ray Player
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric Scent Diffuser
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Smart Lighting System
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Media Player Console
            </label>
          </div>
        </div>




{/* study room: -----------==================----------------------=-------------------------------> */}
<h6 className="mt-4 mb-3">Study Room</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Printer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Scanner
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Paper shredder
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Desk lamp
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Desktop computer
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Laptop
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              External hard drive
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Monitor
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Speakers
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Projector
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Whiteboard
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Telephone
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Clock
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Cordless phone
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Bluetooth speaker
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Alarm clock
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Portable air conditioner
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Backup power supply (UPS)
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Cable modem/router
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Bookshelves or Display Cabinets
            </label>
          </div>
        </div>




{/* LIGHTING : -----------==================----------------------=-------------------------------> */}
<h6 className="mt-4 mb-3">Lighting</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Chandeliers
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Pendant Lights
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Flush Mount Ceiling Lights
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Recessed Lighting
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Floor Lamps
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              LED Strip Lights
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Under Cabinet Lighting
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Wall Sconces
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Track Lighting
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Table Lamps
            </label>
          </div>
        </div>



   
        
        {/* Pet amenities -----------==================----------------------=-------------------------------> */}
        <h6 className="mt-4 mb-3">Pet amenities </h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Dog park
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Dog run
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Pet concierge
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Pet daycare
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Pet-friendly units
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Pet spa
            </label>
          </div>
        </div>

        {/* Parking amenities -----------==================----------------------=-------------------------------> */}
        <h6 className="mt-4 mb-3">Parking amenities</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Covered parking
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Designated parking space
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Electric vehicle charging stations
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Garage
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Bike parking or storage
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Bike repair shops
            </label>
          </div>
        </div>

        {/* Accessibility amenities -----------==================----------------------=-------------------------------> */}
        <h6 className="mt-4 mb-3">Accessibility amenities</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Elevators
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Low-resistance flooring
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Wide doorways and hallways
            </label>
          </div>
        </div>




   {/* Security amenities -----------==================----------------------=-------------------------------> */}
   <h6 className="mt-4 mb-3">Security amenities</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Controlled entry
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Gated entrance
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
             Indoor entry
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              On-site property manager
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              On-site security staff or doorperson
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Secure parking
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Security cameras
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Virtual doorperson
            </label>
          </div>
        </div>



   {/* Tech amenities -----------==================----------------------=-------------------------------> */}
   <h6 className="mt-4 mb-3">Tech amenities</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
            Automated package room 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
             Online apartment maintenance
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Online rent payment
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Smart building entry
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Smart lighting
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Smart locks
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Smart thermostats
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
             Sound systems in community spaces
            </label>
          </div>
        </div>





{/* Storage: -----------==================----------------------=-------------------------------> */}
<h6 className="mt-4 mb-3">Storage</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Closets
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Cabinets
            </label>
          </div>
        </div>


{/* Safety and Security -----------==================----------------------=-------------------------------> */}
<h6 className="mt-4 mb-3">Safety and Security</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Locks on doors and windows
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Smoke detectors
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Fire extinguisher
            </label>
          </div>
        </div>



{/* Building Features -----------==================----------------------=-------------------------------> */}
<h6 className="mt-4 mb-3">Building Features</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Elevator
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Laundry facilities 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Parking space 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Garage
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Sewage and septic tank Cleaning 
            </label>
          </div>
        </div>



{/* Maintenance and Services: -----------==================----------------------=-------------------------------> */}
<h6 className="mt-4 mb-3">Maintenance and Services</h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              On-site maintenance staff
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
             Trash collection
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
             Lift Maintainance 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Laundry Services
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
             Covered Parking Spaces 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Rain Water Harvesting 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
               Flood Water Drainage 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
               Home Services ( Painting,Electrical Works, Plumbing Works etc…)
            </label>
          </div>
        </div>



{/* Swimming Pool Amenities  -----------==================----------------------=-------------------------------> */}
<h6 className="mt-4 mb-3">Swimming Pool Amenities </h6>
        <hr />
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
               Kids Pool Rain Curtain 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Kids Water Slide 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
             Pool Slide Lounges 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
              Seating Patio 
            </label>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="flexCheckDefault"
            />
            <label
              className="form-check-label amenitiesBox"
              htmlFor="flexCheckDefault"
            >
               Pantry Nook 
            </label>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Amenities;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomButton from '../../../component/buttons/CustomButton';
import DocumentCertificate from '../overview/component/document/DocumentCertificate';
import MapComponent from '../../../component/mapcomponent/MapComponent';
import Loader from '../../../component/loader/Loader';
import './Governance.scss';


const Governance: React.FC = () => {
  const location = useLocation();
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const storedRecord = localStorage.getItem("record");
      if (storedRecord) {
        setRecord(JSON.parse(storedRecord));
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />
  }
  const type = location?.pathname.split("/")[3];

  const cards1 = [
    { title: "Management Systems", quality: "QualTech", health: "Orion", environmental: "Orion" },
    { title: "Certifications", quality: "QualTech", health: "Orion", environmental: "Orion" },
    { title: "Insurances", quality: "QualTech", health: "Orion", environmental: "Orion" }
  ];

  const miniCard = [
    { totalsystem: "10", active: "2", outdated: "8", },
  ];

  return (
    <div className='goverance-flex'>
      {type === "governance" &&
        <div className='direction-card'>
          {cards1.map((item, index) => {
            return (
              <div className='governance-main' key={item.title}>
                <div className='governance-content' key={item.title}>
                  <div className='con-title'>{item.title}</div>
                  <div className='governance-con-start'>
                    <div>Quality</div>
                    <div>{item.quality}</div>
                  </div>
                  <div className='governance-con-start'>
                    <div>Environmental</div>
                    <div>{item.environmental}</div>
                  </div>
                  {item.health && (
                    <div className='governance-con-start'>
                      <div>Health</div>
                      <div>{item.health}</div>
                    </div>
                  )}
                </div>
                {type === "governance" &&
                  <div className='governance-overview'>
                    <div className='over-title'>Overview</div>
                    {miniCard?.map((item, index) => {
                      return (
                        <div key={item.outdated}>
                          <div className='text-bottom'>Total Systems: {item.totalsystem}</div>
                          <div className='text-bottom'> Active Systems:{item.active}</div>
                          <div className='text-bottom'>Outdated Systems: {item.outdated}</div>
                        </div>
                      )
                    })}
                    <CustomButton label='View More' type='primary' />
                  </div>
                }

              </div>
            )
          })}
        </div>
      }
      {type === "location" && (
        <div className='location-main'>
          <div className="governance-main">
            <div className="governance-content-location">
              <div className="location-head">{record?.supplier}</div>
              <div className="governance-con-start-loc">
                <div className="location-field">Location :</div>
                <div>{record?.location}</div>
              </div>
              <MapComponent location={record?.location} />
            </div>
          </div>
        </div>
      )}
      {type === "company" &&
        <div className='governance-main'>
          <div className='governance-content' >
            <div className='con-title-com'>{record?.supplier}</div>
            <div className='governance-con-start-com'>
              <div className='company-bold'>Industry</div>
              <div className='company-bold'>{record?.industry}</div>
              <p className='parah-com'>{record?.aboutUs}</p>
            </div>
            <div className='governance-con-start-com'>
              <div className='company-bold'>Contact Us</div>
              <div className='prod-list'>Email: {record?.email}</div>
              <div className='prod-list'>Contact No: {record?.contactUs}</div>

            </div>
          </div>
        </div>
      }
      {type === "products&services" && (
        <div className='prd-main'>
          <div className="governance-main-prod">
            <div className="governance-content-prod">
              <div className="con-title">{record?.supplier}</div>

              <div className="governance-con-start">
                <div className='prod-head'>Industry</div>
                <div className='prod-space'>{record?.industry}</div>
              </div>

              {record?.product && record?.product.length > 0 && (
                <div className="governance-con-start-prod">
                  <div className="prod-head">Products</div>
                  {record?.product.map((prod: string) => (
                    <div className='prod-list' key={prod}>{prod}</div>
                  ))}
                </div>
              )}

              {record?.service && record?.service?.length > 0 && (
                <div className="governance-con-start-prod">
                  <div className='prod-head'>Services</div>
                  {record?.service?.map((serv: string, index: number) => (
                    <div className='prod-list' key={index}>{serv}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className='doc-certi'>
        <DocumentCertificate />
      </div>

    </div>
  );
};

export default Governance;

// import React from 'react';
// import MarqueeMessage from './MarqueeMessage';

// const FarmerPage = () => {
//     return (
//         <div>
//             <MarqueeMessage />
//             <h2>Farmer Dashboard</h2>
//             <p>Welcome to the Farmer Dashboard. You can manage posts about farming.</p>
//         </div>
//     );
// };

// export default FarmerPage;

// import React, { useState } from 'react';
// import MarqueeMessage from './MarqueeMessage';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// const FarmerPage = () => {
//   const [selectedMonth, setSelectedMonth] = useState('');

//   const cropsData = {
//     January: [
//       {
//         name: 'Wheat',
//         image: 'https://5.imimg.com/data5/SELLER/Default/2022/4/DG/XM/PL/150340649/hard-red-winter-wheat.jpg', // Image URL
//         process: 'Planting -> Irrigation -> Harvesting',
//         medicines: 'Fungicides, Herbicides',
//         startToEnd: 'Start in December and harvest by April',
//       },
//       // Add more crops for January
//     ],
//     February: [
//       {
//         name: 'Rice',
//         image: 'https://pic.pikbest.com/best/video_preview_img/2303/6437735.jpg!bw700', // Image URL
//         process: 'Seedling -> Transplanting -> Harvesting',
//         medicines: 'Insecticides, Fertilizers',
//         startToEnd: 'Start in January and harvest by July',
//       },
//       // Add more crops for February
//     ],
//     // Add more months and crops
//   };

//   const handleMonthChange = (e) => {
//     setSelectedMonth(e.target.value);
//   };

//   return (
//     <div className="container">
//       <h2 className="my-4">Farmer Dashboard</h2>
//       <p>Welcome to the Farmer Dashboard. You can manage posts about farming.</p>
//       <div className="form-group">
//         <label htmlFor="monthSelect">Select Month: </label>
//         <select id="monthSelect" className="form-control" onChange={handleMonthChange}>
//           <option value="">--Select Month--</option>
//           {Object.keys(cropsData).map((month) => (
//             <option key={month} value={month}>
//               {month}
//             </option>
//           ))}
//         </select>
//       </div>
//       {selectedMonth && (
//         <div>
//           <h3 className="my-4">Crops for {selectedMonth}</h3>
//           <div className="row">
//             {cropsData[selectedMonth].map((crop, index) => (
//               <div key={index} className="col-md-4 mb-4">
//                 <div className="card">
//                   <img src={crop.image} className="card-img-top" alt={crop.name} />
//                   <div className="card-body">
//                     <h4 className="card-title">{crop.name}</h4>
//                     <p className="card-text"><strong>Process:</strong> {crop.process}</p>
//                     <p className="card-text"><strong>Medicines:</strong> {crop.medicines}</p>
//                     <p className="card-text"><strong>Start to End:</strong> {crop.startToEnd}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FarmerPage;

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Container, Badge, Tabs, Tab } from 'react-bootstrap';
import { Calendar, Clock, Droplet, Activity, Info } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FarmerPage.css'; // You'll need to create this for custom styling
import MarqueeMessage from './MarqueeMessage';

const FarmerDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Comprehensive crops data for all 12 months
  const cropsData = {
    January: [
      {
        name: 'Winter Wheat',
        image: 'https://5.imimg.com/data5/SELLER/Default/2022/4/DG/XM/PL/150340649/hard-red-winter-wheat.jpg',
        process: 'Monitor growth → Apply fertilizer → Weed control',
        chemicals: 'Fungicides (propiconazole), Herbicides (2,4-D)',
        timeline: 'Planted in October, monitor in January, harvest by May-June',
        type: 'Grain',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.0'
      },
      {
        name: 'Mustard',
        image: 'https://media.istockphoto.com/id/902522444/photo/yellow-mustard-field.jpg?s=612x612&w=0&k=20&c=IUNFOrDsDPMWhVUEhhHPUwazpCASr9aG7QP64R0-LcI=',
        process: 'Irrigation → Weeding → Disease monitoring',
        chemicals: 'Pendimethalin, Sulfosulfuron',
        timeline: 'Sown in November, monitor in January, harvest in March',
        type: 'Oilseed',
        difficulty: 'Easy',
        waterNeeds: 'Low',
        soilPH: '5.5-6.8'
      },
      {
        name: 'Winter Vegetables',
        image: 'https://media.istockphoto.com/id/1350415418/photo/assortment-of-raw-winter-vegetables.jpg?s=612x612&w=0&k=20&c=l_tt6yhN5fUlDlDIFPgY6ClFQEJ86kL-dKunIkj0WiU=',
        process: 'Irrigation → Pest control → Fertilizing',
        chemicals: 'Imidacloprid, NPK fertilizers',
        timeline: 'Planted in December, harvest throughout January-February',
        type: 'Vegetable',
        difficulty: 'Medium',
        waterNeeds: 'Medium',
        soilPH: '6.0-7.5'
      }
    ],
    February: [
      {
        name: 'Spring Barley',
        image: 'https://media.istockphoto.com/id/172178326/photo/barley-field-in-spring-to-summer-time.jpg?s=612x612&w=0&k=20&c=E8bBVGThnFy5SJsDMs08MVUgvoo_jhMy-y2kqijp6_8=',
        process: 'Soil preparation → Seeding → Fertilization',
        chemicals: 'Prothioconazole, Bromoxynil',
        timeline: 'Sow in February, harvest by July-August',
        type: 'Grain',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.0'
      },
      {
        name: 'Potatoes (Early)',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXs7r_82XGhdlFPTwlnCbKsMmDqEky6-6zsA&s',
        process: 'Chitting → Planting → Earthing up',
        chemicals: 'Mancozeb, Cymoxanil',
        timeline: 'Plant in February, harvest by June',
        type: 'Tuber',
        difficulty: 'Medium',
        waterNeeds: 'High',
        soilPH: '5.0-6.5'
      },
      {
        name: 'Onions',
        image: 'https://www.thespruce.com/thmb/9sCTW3me2_CbsrHfgpusH2KwV68=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/growing-onions-1403447-01-38d480a2d16d4ea0b0dd174f42785e1d.jpg',
        process: 'Prepare beds → Sow seeds → Thin seedlings',
        chemicals: 'Chlorpyrifos, Pendimethalin',
        timeline: 'Sow in February, harvest by August',
        type: 'Vegetable',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.0'
      }
    ],
    March: [
      {
        name: 'Spring Wheat',
        image: 'https://eu-images.contentstack.com/v3/assets/bltdd43779342bd9107/blt8282f4d70e97990b/638f361e0674de109103817a/0321F1-1441A-1540x800.jpg?width=1280&auto=webp&quality=95&format=jpg&disable=upscale',
        process: 'Soil preparation → Seeding → Fertilization',
        chemicals: 'Tebuconazole, Pyraclostrobin',
        timeline: 'Sow in March, harvest by August',
        type: 'Grain',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.0'
      },
      {
        name: 'Corn (Early)',
        image: 'https://www.pig333.com/3tres3_common/art/pig333/19908/corn_277557.png',
        process: 'Soil preparation → Planting → Fertilizing',
        chemicals: 'Atrazine, Metolachlor',
        timeline: 'Plant in March, harvest by July-August',
        type: 'Grain',
        difficulty: 'Medium',
        waterNeeds: 'High',
        soilPH: '5.8-7.0'
      },
      {
        name: 'Sunflower',
        image: 'https://www.croptrust.org/fileadmin/_processed_/f/3/csm_BI5A9460_3e2b93fe82.jpg',
        process: 'Soil preparation → Seeding → Weed control',
        chemicals: 'Pendimethalin, Imazethapyr',
        timeline: 'Sow in March, harvest by August-September',
        type: 'Oilseed',
        difficulty: 'Easy',
        waterNeeds: 'Low to Moderate',
        soilPH: '6.0-7.5'
      }
    ],
    April: [
      {
        name: 'Cotton',
        image: 'https://www.shutterstock.com/image-photo/cotton-fields-ready-harvesting-600nw-738008380.jpg',
        process: 'Soil preparation → Planting → Irrigation',
        chemicals: 'Imidacloprid, Glyphosate',
        timeline: 'Plant in April, harvest by November-December',
        type: 'Fiber',
        difficulty: 'Hard',
        waterNeeds: 'High',
        soilPH: '5.5-8.0'
      },
      {
        name: 'Soybeans',
        image: 'https://t4.ftcdn.net/jpg/03/93/61/31/360_F_393613168_uB9K43qH7DWeRsIlLQsw8IK77q1miRJT.jpg',
        process: 'Soil inoculation → Planting → Weed management',
        chemicals: 'Glyphosate, Chlorimuron',
        timeline: 'Plant in April, harvest by September-October',
        type: 'Legume',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.0'
      },
      {
        name: 'Rice (Early)',
        image: 'https://media.istockphoto.com/id/622925154/photo/ripe-rice-in-the-field-of-farmland.jpg?s=612x612&w=0&k=20&c=grtA7L3dm_SP80Fdt-PpIwu5GYacZygErTDUDNIKHwY=',
        process: 'Nursery preparation → Transplanting → Irrigation',
        chemicals: 'Pendimethalin, Pretilachlor',
        timeline: 'Start in April, harvest by August',
        type: 'Grain',
        difficulty: 'Hard',
        waterNeeds: 'Very High',
        soilPH: '5.5-6.5'
      }
    ],
    May: [
      {
        name: 'Corn (Main Season)',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNs6_tEFNC6fP_I8hTZ3CqM60GpxjBBvhY7g&s',
        process: 'Soil preparation → Planting → Irrigation',
        chemicals: 'Glyphosate, S-Metolachlor',
        timeline: 'Plant in May, harvest by September',
        type: 'Grain',
        difficulty: 'Medium',
        waterNeeds: 'High',
        soilPH: '5.8-7.0'
      },
      {
        name: 'Peanuts',
        image: 'https://media.istockphoto.com/id/1174867545/photo/farmer-woman-picking-peanuts-autumn-harvesting-farming-and-gardening-concept-organic-farm.jpg?s=612x612&w=0&k=20&c=-JZQgQIsZnXRPnrtqUIGacf9ylUwHSz_HvFDsblmcd8=',
        process: 'Soil preparation → Planting → Pegging',
        chemicals: 'Pendimethalin, Imazapic',
        timeline: 'Plant in May, harvest by October',
        type: 'Legume',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '5.8-6.2'
      },
      {
        name: 'Mung Beans',
        image: 'https://econutplants.com/wp-content/uploads/2024/05/Mung_Bean_Plants.jpg',
        process: 'Soil preparation → Seeding → Irrigation',
        chemicals: 'Pendimethalin, Imazethapyr',
        timeline: 'Sow in May, harvest by July-August',
        type: 'Legume',
        difficulty: 'Easy',
        waterNeeds: 'Low to Moderate',
        soilPH: '6.2-7.2'
      }
    ],
    June: [
      {
        name: 'Rice (Main Season)',
        image: 'https://media.istockphoto.com/id/622925154/photo/ripe-rice-in-the-field-of-farmland.jpg?s=612x612&w=0&k=20&c=grtA7L3dm_SP80Fdt-PpIwu5GYacZygErTDUDNIKHwY=',
        process: 'Nursery preparation → Transplanting → Irrigation',
        chemicals: 'Bispyribac sodium, Butachlor',
        timeline: 'Start in June, harvest by October-November',
        type: 'Grain',
        difficulty: 'Hard',
        waterNeeds: 'Very High',
        soilPH: '5.5-6.5'
      },
      {
        name: 'Okra',
        image: 'https://growinginteractive.s3.eu-west-2.amazonaws.com/blog/okra-2x.jpg',
        process: 'Soil preparation → Sowing → Staking',
        chemicals: 'Pendimethalin, Imidacloprid',
        timeline: 'Sow in June, harvest by August-September',
        type: 'Vegetable',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-6.8'
      },
      {
        name: 'Black Gram',
        image: 'https://m.media-amazon.com/images/I/51pjcPf5fyL.jpg',
        process: 'Soil preparation → Seeding → Irrigation',
        chemicals: 'Pendimethalin, Imazethapyr',
        timeline: 'Sow in June, harvest by September',
        type: 'Legume',
        difficulty: 'Easy',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.5'
      }
    ],
    July: [
      {
        name: 'Sorghum',
        image: 'https://media.istockphoto.com/id/869995278/photo/sorghum.jpg?s=612x612&w=0&k=20&c=1F6AT7X860a_9PzVrOLmJgJiLe4DDVMGIEyq9T-Z9qI=',
        process: 'Land preparation → Sowing → Thinning',
        chemicals: 'Atrazine, 2,4-D',
        timeline: 'Sow in July, harvest by November',
        type: 'Grain',
        difficulty: 'Medium',
        waterNeeds: 'Low',
        soilPH: '5.5-7.5'
      },
      {
        name: 'Millets',
        image: 'https://www.iasgyan.in//ig-uploads/images//image02161.png',
        process: 'Land preparation → Sowing → Weeding',
        chemicals: 'Atrazine, Pendimethalin',
        timeline: 'Sow in July, harvest by October',
        type: 'Grain',
        difficulty: 'Easy',
        waterNeeds: 'Low',
        soilPH: '5.5-7.0'
      },
      {
        name: 'Sesame',
        image: 'https://img-cdn.krishijagran.com/101387/sesame-farming.jpg',
        process: 'Land preparation → Sowing → Thinning',
        chemicals: 'Pendimethalin, Quizalofop-p-ethyl',
        timeline: 'Sow in July, harvest by October',
        type: 'Oilseed',
        difficulty: 'Medium',
        waterNeeds: 'Low to Moderate',
        soilPH: '5.5-8.0'
      }
    ],
    August: [
      {
        name: 'Pigeon Pea',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7tr8iod8Mr69vOHfJ_EA_qLT5zci7hHnDaQ&s',
        process: 'Land preparation → Sowing → Weeding',
        chemicals: 'Pendimethalin, Imazethapyr',
        timeline: 'Sow in August, harvest by December-January',
        type: 'Legume',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '5.0-8.0'
      },
      {
        name: 'Maize (Fall)',
        image: 'https://thumbs.dreamstime.com/b/full-grown-corn-plants-field-autumn-harvest-maize-agriculture-farmland-october-blue-sky-agrictulure-340316800.jpg',
        process: 'Land preparation → Sowing → Irrigation',
        chemicals: 'Atrazine, Nicosulfuron',
        timeline: 'Sow in August, harvest by November-December',
        type: 'Grain',
        difficulty: 'Medium',
        waterNeeds: 'High',
        soilPH: '5.8-7.0'
      },
      {
        name: 'Spinach',
        image: 'https://www.happyvalleyseeds.com.au/cdn/shop/articles/growing-spinach-at-home-a-comprehensive-guide-for-home-gardeners-398292_600x600_crop_center.jpg?v=1718763281',
        process: 'Bed preparation → Sowing → Irrigation',
        chemicals: 'Pendimethalin, Imidacloprid',
        timeline: 'Sow in August, harvest by October-November',
        type: 'Vegetable',
        difficulty: 'Easy',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.5'
      }
    ],
    September: [
      {
        name: 'Mustard',
        image: 'https://media.istockphoto.com/id/1135682778/photo/bright-yellow-field-of-canola.jpg?s=612x612&w=0&k=20&c=aBf8MV0BM_ev66ZXswYKYI0FJ_qTpBb2_DjcFQN-JLs=',
        process: 'Land preparation → Sowing → Irrigation',
        chemicals: 'Pendimethalin, Oxyfluorfen',
        timeline: 'Sow in September, harvest by February',
        type: 'Oilseed',
        difficulty: 'Easy',
        waterNeeds: 'Low',
        soilPH: '5.5-6.8'
      },
      {
        name: 'Chickpeas',
        image: 'https://media.istockphoto.com/id/638538708/photo/woman-showing-chickpeas-in-close-up.jpg?s=612x612&w=0&k=20&c=ZAZ-5i5KuuteCEOZrrwQ3S30yh-ptUVwZ752-LG90cg=',
        process: 'Land preparation → Sowing → Irrigation',
        chemicals: 'Pendimethalin, Imazethapyr',
        timeline: 'Sow in September, harvest by January-February',
        type: 'Legume',
        difficulty: 'Medium',
        waterNeeds: 'Low',
        soilPH: '6.0-9.0'
      },
      {
        name: 'Lentils',
        image: 'https://media.istockphoto.com/id/956458060/photo/close-up-of-lentil-plant.jpg?s=612x612&w=0&k=20&c=984-cZ0i-NJl-7B4WJ1zPcaRbPZAFKHaOlsQdHiNLSc=',
        process: 'Land preparation → Sowing → Weed management',
        chemicals: 'Pendimethalin, Quizalofop-p-ethyl',
        timeline: 'Sow in September, harvest by February',
        type: 'Legume',
        difficulty: 'Medium',
        waterNeeds: 'Low',
        soilPH: '6.0-8.0'
      }
    ],
    October: [
      {
        name: 'Winter Wheat',
        image: 'https://eu-images.contentstack.com/v3/assets/bltdd43779342bd9107/blt6bd8e796aae0081f/663b6e97a11982092c732460/0506H1-2059A-1800x1012.jpg?width=1280&auto=webp&quality=95&format=jpg&disable=upscale',
        process: 'Soil preparation → Seeding → Fertilization',
        chemicals: 'Pendimethalin, Sulfosulfuron',
        timeline: 'Sow in October, harvest by April-May',
        type: 'Grain',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.0'
      },
      {
        name: 'Barley',
        image: 'https://upaj.ag/cdn/shop/articles/Barley.png?v=1724838064&width=1100',
        process: 'Soil preparation → Seeding → Fertilization',
        chemicals: 'Pendimethalin, Metsulfuron-methyl',
        timeline: 'Sow in October, harvest by March-April',
        type: 'Grain',
        difficulty: 'Medium',
        waterNeeds: 'Low to Moderate',
        soilPH: '6.0-7.0'
      },
      {
        name: 'Peas',
        image: 'https://www.thespruce.com/thmb/5CysZ8mFLI2QBVCnSG8waIzPvII=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/garden-vs-snow-and-sugar-snap-1403487-04-4216b24a579a4a899e7db3a44e4fe0e3.jpg',
        process: 'Soil preparation → Sowing → Staking',
        chemicals: 'Pendimethalin, Quizalofop-p-ethyl',
        timeline: 'Sow in October, harvest by January-February',
        type: 'Legume',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.5'
      }
    ],
    November: [
      {
        name: 'Garlic',
        image: 'https://t4.ftcdn.net/jpg/03/64/05/63/360_F_364056397_c1wiuR4RRXuu8WFNN3igdbwon6yz2NqU.jpg',
        process: 'Bed preparation → Clove planting → Mulching',
        chemicals: 'Pendimethalin, Oxyfluorfen',
        timeline: 'Plant in November, harvest by April-May',
        type: 'Vegetable',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.0'
      },
      {
        name: 'Potato',
        image: 'https://media.istockphoto.com/id/1220924272/photo/potatoes-in-the-field.jpg?s=612x612&w=0&k=20&c=CnQo4b1Nk55CLAPOgGzspKo2JYTpNwflSiMMXFYqcC0=',
        process: 'Land preparation → Planting → Earthing up',
        chemicals: 'Metribuzin, Mancozeb',
        timeline: 'Plant in November, harvest by February-March',
        type: 'Tuber',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '5.0-6.5'
      },
      {
        name: 'Onion',
        image: 'https://farmatma.in/wp-content/uploads/2017/12/onion-farming.jpg',
        process: 'Seedbed preparation → Transplanting → Irrigation',
        chemicals: 'Pendimethalin, Oxyfluorfen',
        timeline: 'Transplant in November, harvest by March-April',
        type: 'Vegetable',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.0'
      }
    ],
    December: [
      {
        name: 'Cauliflower',
        image: 'https://agricare.global/public/uploads/horizontalImage/Cauliflower-Cultivation---7-1726053099746.jpg',
        process: 'Seedbed preparation → Transplanting → Irrigation',
        chemicals: 'Pendimethalin, Cypermethrin',
        timeline: 'Transplant in December, harvest by February-March',
        type: 'Vegetable',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.0'
      },
      {
        name: 'Cabbage',
        image: 'https://www.shutterstock.com/image-photo/young-cabbage-grows-farmer-field-600nw-2117937080.jpg',
        process: 'Seedbed preparation → Transplanting → Irrigation',
        chemicals: 'Pendimethalin, Cypermethrin',
        timeline: 'Transplant in December, harvest by February-March',
        type: 'Vegetable',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.0'
      },
      {
        name: 'Carrots',
        image: 'https://img.khetivyapar.com/images/blogs/1708060796-carrot-cultivation-will-be-a-profitable-crop-for-farmers-and-will-provide-good-production.jpg',
        process: 'Bed preparation → Sowing → Thinning',
        chemicals: 'Pendimethalin, Linuron',
        timeline: 'Sow in December, harvest by March',
        type: 'Vegetable',
        difficulty: 'Medium',
        waterNeeds: 'Moderate',
        soilPH: '6.0-7.0'
      }
    ]
  };

  // Handle month selection
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter crops based on month and search term
  useEffect(() => {
    let crops = [];
    
    // If month is selected, filter by month
    if (selectedMonth) {
      crops = cropsData[selectedMonth];
    } else {
      // If no month selected, show all crops
      Object.values(cropsData).forEach(monthCrops => {
        crops = [...crops, ...monthCrops];
      });
    }
    
    // Filter by search term if present
    if (searchTerm) {
      crops = crops.filter(crop => 
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        crop.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCrops(crops);
  }, [selectedMonth, searchTerm]);

  // Group crops by type
  const groupedCrops = filteredCrops.reduce((acc, crop) => {
    if (!acc[crop.type]) {
      acc[crop.type] = [];
    }
    acc[crop.type].push(crop);
    return acc;
  }, {});

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'danger';
      default: return 'secondary';
    }
  };

  // Get water needs icon count
  const getWaterIcons = (needs) => {
    switch(needs) {
      case 'Low': return 1;
      case 'Low to Moderate': return 2;
      case 'Moderate': return 3;
      case 'High': return 4;
      case 'Very High': return 5;
      default: return 2;
    }
  };

  return (
    <>
    <MarqueeMessage/>
    <Container fluid className="py-4 farmer-dashboard">
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <h1 className="dashboard-title">Agricultural Crop Management System</h1>
          <p className="text-muted">Professional dashboard for seasonal crop planning and management</p>
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-md-end">
            <Form.Group className="me-3" style={{ width: '200px' }}>
              <Form.Control 
                type="text" 
                placeholder="Search crops..." 
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </Form.Group>
            <Form.Group style={{ width: '200px' }}>
              <Form.Select onChange={handleMonthChange} value={selectedMonth}>
                <option value="">All Months</option>
                {Object.keys(cropsData).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <div className="d-flex align-items-center">
            <h2 className="mb-0">
              {selectedMonth ? `${selectedMonth} Crops` : 'All Seasonal Crops'}
            </h2>
            <Badge bg="primary" className="ms-2">
              {filteredCrops.length} crops
            </Badge>
          </div>
        </Col>
      </Row>

      <Tabs defaultActiveKey="all" className="mb-4 crop-tabs">
        <Tab eventKey="all" title="All Types">
          <Row>
            {filteredCrops.map((crop, index) => (
              <Col lg={4} md={6} sm={12} key={index} className="mb-4">
                <Card className="h-100 crop-card">
                  <div className="crop-image-container">
                    <Card.Img variant="top" src={crop.image} alt={crop.name} className="crop-image" />
                    <Badge 
                      bg={getDifficultyColor(crop.difficulty)} 
                      className="position-absolute top-0 end-0 m-2"
                    >
                      {crop.difficulty}
                    </Badge>
                    <Badge 
                      bg="info" 
                      className="position-absolute top-0 start-0 m-2"
                    >
                      {crop.type}
                    </Badge>
                  </div>
                  <Card.Body>
                    <Card.Title className="crop-title">{crop.name}</Card.Title>
                    <div className="crop-details mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <Clock size={16} className="me-2 text-primary" />
                        <small>{crop.timeline}</small>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <Droplet size={16} className="me-2 text-primary" />
                        <small>Water Needs: {crop.waterNeeds}</small>
                        <div className="ms-2">
                          {[...Array(getWaterIcons(crop.waterNeeds))].map((_, i) => (
                            <Droplet key={i} size={12} className="text-info me-1" />
                          ))}
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Activity size={16} className="me-2 text-primary" />
                        <small>Soil pH: {crop.soilPH}</small>
                      </div>
                    </div>
                    <Card.Text>
                      <strong>Process:</strong> {crop.process}
                    </Card.Text>
                    <Card.Text>
                      <strong>Pesticides:</strong> {crop.chemicals}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white">
                    <small className="text-muted d-flex align-items-center">
                      <Info size={16} className="me-2" />
                      Click for detailed management guide
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
        {Object.keys(groupedCrops).map(type => (
          <Tab eventKey={type.toLowerCase()} title={type} key={type}>
            <Row>
              {groupedCrops[type].map((crop, index) => (
                <Col lg={4} md={6} sm={12} key={index} className="mb-4">
                  <Card className="h-100 crop-card">
                    <div className="crop-image-container">
                      <Card.Img variant="top" src={crop.image} alt={crop.name} className="crop-image" />
                      <Badge 
                        bg={getDifficultyColor(crop.difficulty)} 
                        className="position-absolute top-0 end-0 m-2"
                      >
                        {crop.difficulty}
                      </Badge>
                    </div>
                    <Card.Body>
                      <Card.Title className="crop-title">{crop.name}</Card.Title>
                      <div className="crop-details mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <Clock size={16} className="me-2 text-primary" />
                          <small>{crop.timeline}</small>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <Droplet size={16} className="me-2 text-primary" />
                          <small>Water Needs: {crop.waterNeeds}</small>
                          <div className="ms-2">
                            {[...Array(getWaterIcons(crop.waterNeeds))].map((_, i) => (
                              <Droplet key={i} size={12} className="text-info me-1" />
                            ))}
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <Activity size={16} className="me-2 text-primary" />
                          <small>Soil pH: {crop.soilPH}</small>
                        </div>
                      </div>
                      <Card.Text>
                        <strong>Process:</strong> {crop.process}
                      </Card.Text>
                      <Card.Text>
                        <strong>Pesticides:</strong> {crop.chemicals}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white">
                      <small className="text-muted d-flex align-items-center">
                        <Info size={16} className="me-2" />
                        Click for detailed management guide
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Tab>
        ))}
      </Tabs>

      {filteredCrops.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted">No crops found matching your criteria</h4>
          <p>Try selecting a different month or adjusting your search</p>
        </div>
      )}

      <Row className="mt-5">
        <Col>
          <Card className="bg-light border-0">
            <Card.Body>
              <h4 className="mb-3">Seasonal Recommendations</h4>
              <p>Based on current conditions and market trends, we recommend prioritizing:</p>
              <ul className="recommendation-list">
                <li>High-yield varieties for {selectedMonth || 'current season'}</li>
                <li>Water conservation methods due to changing rainfall patterns</li>
                <li>Integrated pest management to reduce chemical inputs</li>
                <li>Soil health maintenance with appropriate crop rotation</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};


export default FarmerDashboard;
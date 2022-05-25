const   mongoose    = require('mongoose'),
        Product     = require('./models/product');
        Address     = require('./models/address');
        User        = require('./models/user');

// const data = [
//         {
//             name:"NOTEBOOK ASUS M515DA-EJ701WS (SLATE GREY)", 
//             price:"18,990", 
//             image:"https://www.jib.co.th/img_master/product/original/20220312091007_52006_352_1.jpg",
//             description:'• AMD Ryzen 7 3700U\n• 8GB DDR4 (ON BOARD)\n• 512GB PCIe/NVMe M.2 SSD\n• 15.6" FHD Anti-Glare\n• AMD Radeon RX Vega 10 Graphics (Integrated)\n• Windows 11 Home + Office Home and Student 2021'
//         },
//         {
//             name:"NOTEBOOK PREDATOR HELIOS 500 PH517-52-7290 (ABYSS BLACK)", 
//             price:"79,990", 
//             image:"https://www.jib.co.th/img_master/product/original/2022012811274751262_1.jpg",
//             description:'• Intel Core i7-11800H\n• 32GB (16GB x2) DDR4\n• 1TB PCIe/NVMe SSD\n• 17.3" QHD IPS 165Hz\n• NVIDIA GeForce RTX 3070 8 GB GDDR6\n• Windows 11 Home'
//         },
//         {
//             name:"NOTEBOOK ACER NITRO 5 AN515-57-99W3 (SHALE BLACK)", 
//             price:"59,990", 
//             image:"https://www.jib.co.th/img_master/product/original/20220129171909_51264_352_1.jpg",
//             description:'• Intel Core i9-11900H\n• 16GB DDR4\n• 1TB PCIe/NVMe SSD\n•15.6" QHD IPS 165Hz\n• NVIDIA GeForce RTX 3070 8 GB GDDR6\n• Windows 11 Home'
//         },
//         {
//             name:"NOTEBOOK ALIENWARE M15 R5-W569211500ATHW10 (DARK SIDE OF THE MOON)", 
//             price:"72,590", 
//             image:"https://www.jib.co.th/img_master/product/original/20220225180126_48548_352_1.jpg",
//             description:'• AMD Ryzen 7 5800H\n• 16GB DDR4 3200MHz\n• 512GB PCIe/NVMe M.2 SSD\n• 15.6" Full HD 165Hz\n• NVIDIA GeForce RTX 3060 6 GB GDDR6\n• Windows 11 Home + Office Home & Student'
//         },
//         {
//             name:"NOTEBOOK ASUS TUF DASH F15 FX517ZE-HN007W (OFF BLACK)", 
//             price:"40,990", 
//             image:"https://www.jib.co.th/img_master/product/original/20220402162257_52485_352_1.jpg",
//             description:'• Intel Core i7-12650H\n• 8GB DDR5 4800MHz\n• 512GB PCIe/NVMe M.2 SSD\n• 15.6" Full HD IPS Anti-Glare 144Hz\n• NVIDIA GeForce RTX 3050Ti 4 GB GDDR6\n• Windows 11 Home'
//         },
//         {
//             name:"NOTEBOOK ASUS ROG STRIX SCAR 17 G743ZW-LL161W (OFF BLACK)", 
//             price:"92,990", 
//             image:"https://www.jib.co.th/img_master/product/original/20220405085254_52436_352_1.jpg",
//             description:'• Intel Core i9-12900H\n• 32GB (16GB x2) DDR5 4800MHz\n• 1TB PCIe/NVMe M.2 SSD\n• 17.3" WQHD IPS Anti-Glare 240Hz\n• NVIDIA GeForce RTX 3070TI 8 GB GDDR6\n• Windows 11 Home'
//         },
//         {
//             name:"NOTEBOOK HP VICTUS 16-E0233AX (CERAMIC WHITE)", 
//             price:"35,990", 
//             image:"https://www.jib.co.th/img_master/product/original/20220402162510_52484_352_1.jpg",
//             description:'• AMD Ryzen 5 5600H\n• 8GB DDR4 3200MHz\n• 512GB PCIe/NVMe M.2 SSD\n• 16.1" Full HD IPS Anti-Glare 144Hz\n• NVIDIA GeForce RTX 3050TI 4 GB GDDR6\n• Windows 11 Home'
//         },
//         {
//             name:"NOTEBOOK HP OMEN 16-C0125AX (MICA SILVER)", 
//             price:"63,990", 
//             image:"https://www.jib.co.th/img_master/product/original/20220124162850_51067_352_1.jpg",
//             description:'• AMD Ryzen 7 5800H\n• 16GB (8GBx2) DDR4 3200MHz\n• 1TB PCIe/NVMe M.2 SSD\n• 16.1" QHD IPS Anti-Glare 165Hz\n• NVIDIA GeForce RTX 3070 8 GB GDDR6\n• Windows 10 Home'
//         },
//         {
//             name:"NOTEBOOK LENOVO IDEAPAD GAMING 3 15IHU6-82K1016JTA (SHADOW BLACK)", 
//             price:"29,990", 
//             image:"https://www.jib.co.th/img_master/product/original/20220427092252_52739_352_1.jpg",
//             description:'• Intel Core i5-11320H\n• 8GB DDR4 3200MHz\n• 512GB PCIe/NVMe M.2 2242\n• 15.6" Full HD IPS Anti-Glare 120Hz\n• NVIDIA GeForce RTX 3050 4 GB GDDR6\n• Windows 11 Home'
//         },
//         {
//             name:"NOTEBOOK LENOVO LEGION 5 15ACH6H-82JU015PTA (PHANTOM BLUE)", 
//             price:"47,990", 
//             image:"https://www.jib.co.th/img_master/product/original/20220402163010_52497_352_1.jpg",
//             description:'• AMD Ryzen 7 5800H\n• 16GB (8GB x2) DDR4 3200MHz\n• 512GB PCIe/NVMe M.2 2280 SSD\n• 15.6" WQHD IPS Anti-Glare 165Hz\n• NVIDIA GeForce RTX 3060 6 GB GDDR6\n• Windows 11 Home'
//         }
//     ];


const data = [
    {
        name:"NOTEBOOK ASUS M515DA-EJ701WS (SLATE GREY)", 
        price:18990, 
        image:"https://www.jib.co.th/img_master/product/original/20220312091007_52006_352_1.jpg",
        description:'• AMD Ryzen 7 3700U\n• 8GB DDR4 (ON BOARD)\n• 512GB PCIe/NVMe M.2 SSD\n• 15.6" FHD Anti-Glare\n• AMD Radeon RX Vega 10 Graphics (Integrated)\n• Windows 11 Home + Office Home and Student 2021'
    },
    {
        name:"NOTEBOOK PREDATOR HELIOS 500 PH517-52-7290 (ABYSS BLACK)", 
        price:79990, 
        image:"https://www.jib.co.th/img_master/product/original/2022012811274751262_1.jpg",
        description:'• Intel Core i7-11800H\n• 32GB (16GB x2) DDR4\n• 1TB PCIe/NVMe SSD\n• 17.3" QHD IPS 165Hz\n• NVIDIA GeForce RTX 3070 8 GB GDDR6\n• Windows 11 Home'
    },
    {
        name:"NOTEBOOK ACER NITRO 5 AN515-57-99W3 (SHALE BLACK)", 
        price:59990, 
        image:"https://www.jib.co.th/img_master/product/original/20220129171909_51264_352_1.jpg",
        description:'• Intel Core i9-11900H\n• 16GB DDR4\n• 1TB PCIe/NVMe SSD\n•15.6" QHD IPS 165Hz\n• NVIDIA GeForce RTX 3070 8 GB GDDR6\n• Windows 11 Home'
    },
    {
        name:"NOTEBOOK ALIENWARE M15 (DARK SIDE OF THE MOON)", 
        price:72590, 
        image:"https://www.jib.co.th/img_master/product/original/20220225180126_48548_352_1.jpg",
        description:'• AMD Ryzen 7 5800H\n• 16GB DDR4 3200MHz\n• 512GB PCIe/NVMe M.2 SSD\n• 15.6" Full HD 165Hz\n• NVIDIA GeForce RTX 3060 6 GB GDDR6\n• Windows 11 Home + Office Home & Student'
    },
    {
        name:"NOTEBOOK ASUS TUF DASH F15 FX517ZE-HN007W (OFF BLACK)", 
        price:40990, 
        image:"https://www.jib.co.th/img_master/product/original/20220402162257_52485_352_1.jpg",
        description:'• Intel Core i7-12650H\n• 8GB DDR5 4800MHz\n• 512GB PCIe/NVMe M.2 SSD\n• 15.6" Full HD IPS Anti-Glare 144Hz\n• NVIDIA GeForce RTX 3050Ti 4 GB GDDR6\n• Windows 11 Home'
    },
    {
        name:"NOTEBOOK ASUS ROG STRIX SCAR 17 G743ZW-LL161W (OFF BLACK)", 
        price:92990, 
        image:"https://www.jib.co.th/img_master/product/original/20220405085254_52436_352_1.jpg",
        description:'• Intel Core i9-12900H\n• 32GB (16GB x2) DDR5 4800MHz\n• 1TB PCIe/NVMe M.2 SSD\n• 17.3" WQHD IPS Anti-Glare 240Hz\n• NVIDIA GeForce RTX 3070TI 8 GB GDDR6\n• Windows 11 Home'
    },
    {
        name:"NOTEBOOK HP VICTUS 16-E0233AX (CERAMIC WHITE)", 
        price:35990, 
        image:"https://www.jib.co.th/img_master/product/original/20220402162510_52484_352_1.jpg",
        description:'• AMD Ryzen 5 5600H\n• 8GB DDR4 3200MHz\n• 512GB PCIe/NVMe M.2 SSD\n• 16.1" Full HD IPS Anti-Glare 144Hz\n• NVIDIA GeForce RTX 3050TI 4 GB GDDR6\n• Windows 11 Home'
    },
    {
        name:"NOTEBOOK HP OMEN 16-C0125AX (MICA SILVER)", 
        price:63990, 
        image:"https://www.jib.co.th/img_master/product/original/20220124162850_51067_352_1.jpg",
        description:'• AMD Ryzen 7 5800H\n• 16GB (8GBx2) DDR4 3200MHz\n• 1TB PCIe/NVMe M.2 SSD\n• 16.1" QHD IPS Anti-Glare 165Hz\n• NVIDIA GeForce RTX 3070 8 GB GDDR6\n• Windows 10 Home'
    },
    {
        name:"NOTEBOOK LENOVO IDEAPAD GAMING 3 (SHADOW BLACK)", 
        price:29990, 
        image:"https://www.jib.co.th/img_master/product/original/20220427092252_52739_352_1.jpg",
        description:'• Intel Core i5-11320H\n• 8GB DDR4 3200MHz\n• 512GB PCIe/NVMe M.2 2242\n• 15.6" Full HD IPS Anti-Glare 120Hz\n• NVIDIA GeForce RTX 3050 4 GB GDDR6\n• Windows 11 Home'
    },
    {
        name:"NOTEBOOK LENOVO LEGION 5 15ACH6H-82JU015PTA (PHANTOM BLUE)", 
        price:47990, 
        image:"https://www.jib.co.th/img_master/product/original/20220402163010_52497_352_1.jpg",
        description:'• AMD Ryzen 7 5800H\n• 16GB (8GB x2) DDR4 3200MHz\n• 512GB PCIe/NVMe M.2 2280 SSD\n• 15.6" WQHD IPS Anti-Glare 165Hz\n• NVIDIA GeForce RTX 3060 6 GB GDDR6\n• Windows 11 Home'
    },
    {
        name:"KEYBOARD ARROW X YDK-SK-K8620 (EN/TH)", 
        price:250, 
        image:"https://www.jib.co.th/img_master/product/original/2022031009010751978_1.jpg",
        description:'• Rubber Dome\n• English / Thai Legend (Font)\n• USB 2.0'
    },
    {
        name:"KEYBOARD DELL BUSINESS MULTIMEDIA KB522 (ENG/TH)", 
        price:720, 
        image:"https://www.jib.co.th/img_master/product/original/2021082017123648172_1.jpg",
        description:'• Keys Qty : 104\n• Keycap Font : English/Thai\n• Connectivity : USB-A (Wired)'
    },
    {
        name:"KEYBOARD LOGITECH G G512 (RGB LED) (US/TH)", 
        price:299, 
        image:"https://www.jib.co.th/img_master/product/original/2020062908585140865_1.jpg",
        description:'• Switch : GX Blue Clicky\n• Lighting : RGB\n• Keycap Font : English/Thai\n• Connectivity : USB 2.0 Type-A'
    },
    {
        name:"KEYBOARD SIGNO KB-730 CENTAURUS (RGB LED) (US/TH)", 
        price:790, 
        image:"https://www.jib.co.th/img_master/product/original/20211209094920_25142_66_1.jpg",
        description:'• Switch : Semi-mechanical Rubber Dome Switch\n• Lighting : RGB\n• Keycap Legend (Font) : English / Thai\n• Connectivity : USB 2.0'
    },
    {
        name:"KEYBOARD HyperX ALLOY ORIGINS (RED SWITCH) MECHANICAL (THAI)", 
        price:3290, 
        image:"https://www.jib.co.th/img_master/product/original/2019102110195735556_1.jpg",
        description:'• Switch : HyperX Red Switch\n• Lighting : RGB\n• Keycap Font : English/Thai\n• Connectivity : USB (USB Type-C to USB Type-A)'
    },
    {
        name:"KEYBOARD LOGITECH G213 PRODIGY (RGB LED) (EN/TH)", 
        price:1350, 
        image:"https://www.jib.co.th/img_master/product/original/20181225174841_23793_24_1.png",
        description:'• Switch : Membrane\n• Lighting : RGB\n• Keycap Font : English/Thai\n• Connectivity : USB 2.0 Type-A'
    },
    {
        name:"KEYBOARD NUBWO NK030 VAKANT (7 COLORS LED) (EN/TH)", 
        price:460, 
        image:"https://www.jib.co.th/img_master/product/original/20201030101211_24170_66_1.jpg",
        description:'• Switch : Rubber Dome\n• Lighting : 7 Colors LED\n• Keycap Font : English/Thai\n• Connectivity : USB'
    },
    {
        name:"KEYBAORD SIGNO KB-738 INFESTA (BLUE OPTICAL SWITCH) (RAINBOW LED) (EN/TH)", 
        price:1190, 
        image:"https://www.jib.co.th/img_master/product/original/2019042913403333626_1.jpg",
        description:'• Switch : Blue Optical Switches\n• Lighting : Mini RGB\n• Keycap Font : English/Thai\n• Connectivity : USB 2.0'
    },
    {
        name:"KEYBOARD CORSAIR K60 RGB PRO (CHERRY VIOLA) (RGB LED) (EN/TH)", 
        price:3290, 
        image:"https://www.jib.co.th/img_master/product/original/2020112814532943990_1.jpg",
        description:'• Switch : Cherry Viola\n• Lighting : RGB\n• Keycap Font : English/Thai\n• Connectivity : USB 3.0/3.1 Type-A'
    },
    {
        name:"MOUSE NUBWO SILENT NM019 (RED)", 
        price:150, 
        image:"https://www.jib.co.th/img_master/product/original/20180920112823_14352_24_1.png",
        description:'• 2400 dpi\n• USB-A'
    },
    {
        name:"MOUSE LOGITECH M100R USB OPTICAL (BLACK)", 
        price:170, 
        image:"https://www.jib.co.th/img_master/product/original/20180717112659_10627_23_1.jpg",
        description:'• 1000 dpi\n• USB-A'
    },
    {
        name:"WIRELESS MOUSE LOGITECH G304 LIGHTSPEED WIRELESS", 
        price:1390, 
        image:"https://www.jib.co.th/img_master/product/original/20180803132758_30343_24_1.png",
        description:'• 200-12000 DPI\n• 6 Button\n• Wireless 2.4GHz'
    },
    {
        name:"MOUSE RAZER DEATHADDER ESSENTIAL (BLACK)", 
        price:699, 
        image:"https://www.jib.co.th/img_master/product/original/20210827154620_30959_66_1.jpg",
        description:'• DPI : 6,400\n• Button : 5\n• Lighting : Green Color\n• Connectivity : USB (Wired)'
    },
    {
        name:"MOUSE LOGITECH G502 HERO", 
        price:1390, 
        image:"https://www.jib.co.th/img_master/product/original/20220201164048_32312_66_1.png",
        description:'• 100 - 25,600 DPI\n• 11 Buttons\n• RGB Lighting\n• Wired USB 2.0 Type-A'
    },
    {
        name:"WIRELESS MOUSE LOGITECH G304 LIGHTSPEED WIRELESS (WHITE)", 
        price:1190, 
        image:"https://www.jib.co.th/img_master/product/original/2020111313233043659_1.jpg",
        description:'• 200-12000 DPI\n• 6 Button\n• Wireless 2.4GHz'
    },
    {
        name:"WIRELESS MOUSE ASUS ROG GLADIUS II", 
        price:3790, 
        image:"https://www.jib.co.th/img_master/product/original/2019031816451733268_1.jpg",
        description:'• DPI : 100-16,000\n• Connectivity : USB'
    },
    {
        name:"WIRELESS MOUSE RAZER VIPER ULTIMATE (QUARTZ)", 
        price:4990, 
        image:"https://www.jib.co.th/img_master/product/original/20201020133954_43173_66_1.jpg",
        description:'• Razer™ Hyperspeed Wireless technology\n• Razer™ Focus+ Optical Sensor\n• Razer™ Optical Mouse Switch'
    }
];

function seedDB(){

    // Address.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log('Data Remove Completed');
    //     }
    // });

    // User.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log('Data Remove Completed');
    //     }
    // });


    Product.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log('Data removal complete');
            data.forEach(function(seed){
                Product.create(seed, function(err, print){
                    if(err){
                        console.log(err);
                    } else{
                        console.log('New data added!');
            //             // Comment.create({
            //             //     author: 'Tony',
            //             //     text: 'This is good'
            //             // }, function(err, comment){
            //             //     if(err){
            //             //         console.log(err);
            //             //     }else {
            //             //         print.comments.push(comment);
            //             //         print.save();
            //             //     }
            //             // });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
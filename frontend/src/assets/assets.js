import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MD (General Practitioner)',
        experience: '4 Years',
        about: 'Dr. Richard James is a dedicated General Physician with 4 years of experience, specializing in comprehensive medical care, preventive medicine, and early diagnosis for a wide range of health conditions in Jakarta. He is committed to providing patient-centered care, ensuring thorough examinations, and offering personalized treatment plans tailored to individual needs, with a focus on promoting overall wellness and community health.',
        fees: 50000,
        address: {
            line1: 'Jalan Sudirman No. 10',
            line2: 'Jakarta Pusat'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MD, Sp.OG (Obstetrics & Gynecology)',
        experience: '3 Years',
        about: 'Dr. Emily Larson is an experienced Gynecologist with 3 years of expertise, focusing on women’s health, prenatal care, and gynecological treatments in Surabaya. She provides compassionate care for conditions such as pregnancy, menstrual disorders, and reproductive health, utilizing the latest medical techniques to ensure the well-being of her patients with a holistic approach to women’s healthcare needs.',
        fees: 60000,
        address: {
            line1: 'Jalan Raya Darmo No. 15',
            line2: 'Surabaya'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MD, Sp.KK (Dermatology & Venereology)',
        experience: '1 Years',
        about: 'Dr. Sarah Patel is a skilled Dermatologist with 1 year of experience, specializing in skin conditions, cosmetic dermatology, and treatment plans in Bandung. She offers expert care for acne, eczema, and skin rejuvenation, employing advanced dermatological procedures to enhance skin health, while also providing education on skincare routines tailored to diverse skin types.',
        fees: 30000,
        address: {
            line1: 'Jalan Asia Afrika No. 20',
            line2: 'Bandung'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MD, Sp.A (Pediatrics)',
        experience: '2 Years',
        about: 'Dr. Christopher Lee is a compassionate Pediatrician with 2 years of experience, focusing on child health, vaccinations, and developmental care in Medan. He is dedicated to monitoring growth milestones, managing childhood illnesses, and providing supportive guidance to parents, ensuring a nurturing environment for the healthy development of young patients.',
        fees: 40000,
        address: {
            line1: 'Jalan Gatot Subroto No. 25',
            line2: 'Medan'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MD, Sp.S (Neurology)',
        experience: '4 Years',
        about: 'Dr. Jennifer Garcia is a dedicated Neurologist with 4 years of experience, specializing in neurological disorders and brain health treatments in Semarang. She excels in diagnosing and managing conditions like epilepsy, migraines, and stroke, utilizing cutting-edge technology to improve patient outcomes and enhance quality of life through tailored neurological care.',
        fees: 50000,
        address: {
            line1: 'Jalan Pemuda No. 30',
            line2: 'Semarang'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Gastroenterologist',
        degree: 'MD, Sp.PD-KGEH (Gastroenterology)',
        experience: '4 Years',
        about: 'Dr. Andrew Williams is an expert Gastroenterologist with 4 years of experience, focusing on digestive health and gastrointestinal treatments in Yogyakarta. He specializes in treating conditions such as acid reflux, irritable bowel syndrome, and liver diseases, offering advanced endoscopic procedures and dietary advice to promote long-term digestive wellness.',
        fees: 50000,
        address: {
            line1: 'Jalan Malioboro No. 35',
            line2: 'Yogyakarta'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MD (General Practitioner)',
        experience: '4 Years',
        about: 'Dr. Christopher Davis is a committed General Physician with 4 years of experience, providing holistic care and preventive medicine in Bali. He focuses on chronic disease management, routine check-ups, and health education, ensuring patients receive comprehensive support to maintain optimal health and prevent future medical issues.',
        fees: 50000,
        address: {
            line1: 'Jalan Raya Kuta No. 40',
            line2: 'Denpasar, Bali'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MD, Sp.OG (Obstetrics & Gynecology)',
        experience: '3 Years',
        about: 'Dr. Timothy White is a skilled Gynecologist with 3 years of expertise, specializing in women’s reproductive health in Makassar. He offers expert care for fertility issues, menopause management, and gynecological surgeries, ensuring a supportive and empathetic approach to address the unique health needs of women at all life stages.',
        fees: 60000,
        address: {
            line1: 'Jalan Andi Tonro No. 45',
            line2: 'Makassar'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MD, Sp.KK (Dermatology & Venereology)',
        experience: '1 Years',
        about: 'Dr. Ava Mitchell is a talented Dermatologist with 1 year of experience, focusing on skin care and dermatological treatments in Palembang. She provides solutions for skin allergies, psoriasis, and cosmetic enhancements, combining innovative treatments with patient education to foster long-lasting skin health and confidence.',
        fees: 30000,
        address: {
            line1: 'Jalan Sudirman No. 50',
            line2: 'Palembang'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MD, Sp.A (Pediatrics)',
        experience: '2 Years',
        about: 'Dr. Jeffrey King is a caring Pediatrician with 2 years of experience, specializing in child wellness and pediatric care in Samarinda. He offers expert advice on nutrition, immunization schedules, and behavioral development, creating a trusting environment to support the physical and emotional growth of children.',
        fees: 40000,
        address: {
            line1: 'Jalan Pahlawan No. 55',
            line2: 'Samarinda'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MD, Sp.S (Neurology)',
        experience: '4 Years',
        about: 'Dr. Zoe Kelly is a proficient Neurologist with 4 years of experience, focusing on neurological diagnostics in Surakarta. She is skilled in treating Parkinson’s disease, multiple sclerosis, and nerve injuries, employing advanced diagnostic tools to deliver precise treatments and improve patient mobility and cognitive health.',
        fees: 50000,
        address: {
            line1: 'Jalan Slamet Riyadi No. 60',
            line2: 'Surakarta'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MD, Sp.PD-KGEH (Gastroenterology)',
        experience: '4 Years',
        about: 'Dr. Patrick Harris is an experienced Gastroenterologist with 4 years of expertise, specializing in digestive disorders in Malang. He provides advanced care for ulcers, pancreatitis, and colorectal issues, integrating modern medical technology with personalized dietary plans to enhance digestive system recovery.',
        fees: 50000,
        address: {
            line1: 'Jalan Merdeka No. 65',
            line2: 'Malang'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MD (General Practitioner)',
        experience: '4 Years',
        about: 'Dr. Chloe Evans is a dedicated General Physician with 4 years of experience, offering comprehensive health care in Batam. She excels in managing acute illnesses, conducting health screenings, and providing lifestyle counseling, ensuring patients receive thorough and compassionate medical attention.',
        fees: 50000,
        address: {
            line1: 'Jalan Raja Haji No. 70',
            line2: 'Batam'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MD, Sp.OG (Obstetrics & Gynecology)',
        experience: '3 Years',
        about: 'Dr. Ryan Martinez is a knowledgeable Gynecologist with 3 years of experience, focusing on women’s health in Pekanbaru. He specializes in prenatal care, hormonal therapy, and minimally invasive surgeries, delivering high-quality care with a focus on patient comfort and long-term health outcomes.',
        fees: 60000,
        address: {
            line1: 'Jalan Sudirman No. 75',
            line2: 'Pekanbaru'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MD, Sp.KK (Dermatology & Venereology)',
        experience: '1 Years',
        about: 'Dr. Amelia Hill is a promising Dermatologist with 1 year of experience, specializing in skin treatments in Manado. She addresses issues like skin infections, aging skin, and laser therapies, offering personalized treatment plans and educating patients on maintaining healthy skin in various climates.',
        fees: 30000,
        address: {
            line1: 'Jalan Sam Ratulangi No. 80',
            line2: 'Manado'
        }
    },
]
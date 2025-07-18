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
        speciality: { 
            en: 'General physician', 
            id: 'Dokter Umum' 
        },
        degree: { 
            en: 'MD (General Practitioner)', 
            id: 'MD (Dokter Umum)' 
        },
        experience: { 
            en: '4 Years', 
            id: '4 Tahun' 
        },
        about: {
            en: 'Dr. Richard James is a dedicated General Physician with 4 years of experience, specializing in comprehensive medical care, preventive medicine, and early diagnosis for a wide range of health conditions in Jakarta. He is committed to providing patient-centered care, ensuring thorough examinations, and offering personalized treatment plans tailored to individual needs, with a focus on promoting overall wellness and community health.',
            id: 'Dr. Richard James adalah seorang Dokter Umum berdedikasi dengan pengalaman 4 tahun, yang mengkhususkan diri dalam perawatan medis menyeluruh, pengobatan preventif, dan diagnosis dini untuk berbagai kondisi kesehatan di Jakarta. Ia berkomitmen untuk memberikan perawatan berpusat pada pasien, memastikan pemeriksaan menyeluruh, dan menawarkan rencana perawatan yang dipersonalisasi dengan fokus pada kesejahteraan dan kesehatan masyarakat secara keseluruhan.'
        },
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
        speciality: { 
            en: 'Gynecologist', 
            id: 'Dokter Kandungan' 
        },
        degree: { 
            en: 'MD, Sp.OG (Obstetrics & Gynecology)', 
            id: 'MD, Sp.OG (Kebidanan & Kandungan)' 
        },
        experience: { 
            en: '3 Years', 
            id: '3 Tahun' 
        },
        about: {
            en: 'Dr. Emily Larson is an experienced Gynecologist with 3 years of expertise, focusing on women’s health, prenatal care, and gynecological treatments in Surabaya. She provides compassionate care for conditions such as pregnancy, menstrual disorders, and reproductive health, utilizing the latest medical techniques to ensure the well-being of her patients with a holistic approach to women’s healthcare needs.',
            id: 'Dr. Emily Larson adalah dokter kandungan berpengalaman dengan 3 tahun keahlian, fokus pada kesehatan wanita, perawatan prenatal, dan pengobatan ginekologi di Surabaya. Ia memberikan perawatan penuh empati untuk kondisi seperti kehamilan, gangguan menstruasi, dan kesehatan reproduksi, dengan teknik medis terkini dan pendekatan holistik untuk kebutuhan kesehatan wanita.'
        },
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
        speciality: { 
            en: 'Dermatologist', 
            id: 'Dokter Kulit' 
        },
        degree: { 
            en: 'MD, Sp.KK (Dermatology)', 
            id: 'MD, Sp.KK (Kulit)' 
        },
        experience: { 
            en: '1 Year', 
            id: '1 Tahun' 
        },
        about: {
            en: 'Dr. Sarah Patel is a skilled Dermatologist with 1 year of experience, specializing in skin conditions, cosmetic dermatology, and treatment plans in Bandung. She offers expert care for acne, eczema, and skin rejuvenation, employing advanced dermatological procedures to enhance skin health, while also providing education on skincare routines tailored to diverse skin types.',
            id: 'Dr. Sarah Patel adalah dokter kulit berpengalaman dengan 1 tahun pengalaman, fokus pada kondisi kulit, dermatologi kosmetik, dan rencana perawatan di Bandung. Ia menawarkan perawatan ahli untuk jerawat, eksim, dan peremajaan kulit, menggunakan prosedur dermatologis canggih untuk meningkatkan kesehatan kulit dan memberikan edukasi perawatan kulit yang sesuai dengan berbagai jenis kulit.'
        },
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
        speciality: { 
            en: 'Pediatricians', 
            id: 'Dokter Anak' 
        },
        degree: { 
            en: 'MD, Sp.A (Pediatrics)', 
            id: 'MD, Sp.A (Pediatri)' 
        },
        experience: { 
            en: '2 Years', 
            id: '2 Tahun' 
        },
        about: {
            en: 'Dr. Christopher Lee is a compassionate Pediatrician with 2 years of experience, focusing on child health, vaccinations, and developmental care in Medan. He is dedicated to monitoring growth milestones, managing childhood illnesses, and providing supportive guidance to parents, ensuring a nurturing environment for the healthy development of young patients.',
            id: 'Dr. Christopher Lee adalah Dokter Anak yang penuh perhatian dengan pengalaman 2 tahun, berfokus pada kesehatan anak, vaksinasi, dan perawatan perkembangan di Medan. Ia berdedikasi memantau tumbuh kembang, menangani penyakit anak, dan memberi bimbingan kepada orang tua, menciptakan lingkungan yang mendukung perkembangan sehat anak.'
        },
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
        speciality: { 
            en: 'Neurologist', 
            id: 'Dokter Saraf' 
        },
        degree: { 
            en: 'MD, Sp.S (Neurology)', 
            id: 'MD, Sp.S (Neurologi)' 
        },
        experience: { 
            en: '4 Years', 
            id: '4 Tahun' 
        },
        about: {
            en: 'Dr. Jennifer Garcia is a dedicated Neurologist with 4 years of experience, specializing in neurological disorders and brain health treatments in Semarang. She excels in diagnosing and managing conditions like epilepsy, migraines, and stroke, utilizing cutting-edge technology to improve patient outcomes and enhance quality of life through tailored neurological care.',
            id: 'Dr. Jennifer Garcia adalah Dokter Saraf berdedikasi dengan pengalaman 4 tahun, spesialis gangguan neurologis dan perawatan kesehatan otak di Semarang. Ia unggul dalam mendiagnosis dan menangani epilepsi, migrain, dan stroke, menggunakan teknologi mutakhir untuk meningkatkan hasil pasien dan kualitas hidup melalui perawatan saraf yang dipersonalisasi.'
        },
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
        speciality: { 
            en: 'Gastroenterologist', 
            id: 'Dokter Penyakit Dalam' 
        },
        degree: { 
            en: 'MD, Sp.PD-KGEH (Gastroenterology)', 
            id: 'MD, Sp.PD-KGEH (Gastroenterologi)' 
        },
        experience: { 
            en: '4 Years', 
            id: '4 Tahun' 
        },
        about: {
            en: 'Dr. Andrew Williams is an expert Gastroenterologist with 4 years of experience, focusing on digestive health and gastrointestinal treatments in Yogyakarta. He specializes in treating conditions such as acid reflux, irritable bowel syndrome, and liver diseases, offering advanced endoscopic procedures and dietary advice to promote long-term digestive wellness.',
            id: 'Dr. Andrew Williams adalah ahli Gastroenterologi dengan pengalaman 4 tahun, fokus pada kesehatan pencernaan dan pengobatan gastrointestinal di Yogyakarta. Ia mengobati refluks asam, IBS, dan penyakit hati, menawarkan prosedur endoskopi canggih serta saran diet untuk menjaga kesehatan pencernaan jangka panjang.'
        },
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
        speciality: { 
            en: 'General physician', 
            id: 'Dokter Umum' },
        degree: { 
            en: 'MD (General Practitioner)', 
            id: 'MD (Dokter Umum)' 
        },
        experience: { 
            en: '4 Years', 
            id: '4 Tahun' 
        },
        about: {
            en: 'Dr. Christopher Davis is a committed General Physician with 4 years of experience, providing holistic care and preventive medicine in Bali. He focuses on chronic disease management, routine check-ups, and health education, ensuring patients receive comprehensive support to maintain optimal health and prevent future medical issues.',
            id: 'Dr. Christopher Davis adalah Dokter Umum berpengalaman 4 tahun, memberikan perawatan menyeluruh dan pencegahan di Bali. Ia fokus pada manajemen penyakit kronis, pemeriksaan rutin, dan edukasi kesehatan untuk menjaga kesehatan optimal dan mencegah masalah kesehatan di masa depan.'
        },
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
        speciality: { 
            en: 'Gynecologist', 
            id: 'Dokter Kandungan' 
        },
        degree: { 
            en: 'MD, Sp.OG (Obstetrics & Gynecology)', 
            id: 'MD, Sp.OG (Kebidanan & Kandungan)' 
        },
        experience: { 
            en: '3 Years', 
            id: '3 Tahun' 
        },
        about: {
            en: 'Dr. Timothy White is a skilled Gynecologist with 3 years of expertise, specializing in women’s reproductive health in Makassar. He offers expert care for fertility issues, menopause management, and gynecological surgeries, ensuring a supportive and empathetic approach to address the unique health needs of women at all life stages.',
            id: 'Dr. Timothy White adalah Dokter Kandungan berpengalaman 3 tahun, spesialis kesehatan reproduksi wanita di Makassar. Ia menangani masalah kesuburan, menopause, dan bedah ginekologi dengan pendekatan suportif dan empati bagi perempuan di segala usia.'
        },
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
        speciality: { 
            en: 'Dermatologist', 
            id: 'Dokter Kulit' 
        },
        degree: { 
            en: 'MD, Sp.KK (Dermatology)', 
            id: 'MD, Sp.KK (Kulit)' 
        },
        experience: { 
            en: '1 Year', 
            id: '1 Tahun' 
        },
        about: {
            en: 'Dr. Ava Mitchell is a talented Dermatologist with 1 year of experience, focusing on skin care and dermatological treatments in Palembang. She provides solutions for skin allergies, psoriasis, and cosmetic enhancements, combining innovative treatments with patient education to foster long-lasting skin health and confidence.',
            id: 'Dr. Ava Mitchell adalah Dokter Kulit berbakat dengan pengalaman 1 tahun, fokus pada perawatan kulit dan pengobatan dermatologis di Palembang. Ia menangani alergi kulit, psoriasis, dan perawatan kosmetik, menggabungkan teknik inovatif dengan edukasi pasien demi kesehatan dan kepercayaan diri kulit yang optimal.'
        },
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
        speciality: { 
            en: 'Pediatricians', 
            id: 'Dokter Anak' 
        },
        degree: { 
            en: 'MD, Sp.A (Pediatrics)', 
            id: 'MD, Sp.A (Pediatri)' 
        },
        experience: { 
            en: '2 Years', 
            id: '2 Tahun' 
        },
        about: {
            en: 'Dr. Jeffrey King is a caring Pediatrician with 2 years of experience, specializing in child wellness and pediatric care in Samarinda. He offers expert advice on nutrition, immunization schedules, and behavioral development, creating a trusting environment to support the physical and emotional growth of children.',
            id: 'Dr. Jeffrey King adalah Dokter Anak yang peduli dengan pengalaman 2 tahun, spesialis kesehatan anak di Samarinda. Ia memberikan saran gizi, jadwal imunisasi, dan perkembangan perilaku anak, menciptakan lingkungan yang mendukung pertumbuhan fisik dan emosional.'
        },
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
        speciality: { 
            en: 'Neurologist', 
            id: 'Dokter Saraf' 
        },
        degree: { 
            en: 'MD, Sp.S (Neurology)', 
            id: 'MD, Sp.S (Neurologi)' 
        },
        experience: { 
            en: '4 Years', 
            id: '4 Tahun' 
        },
        about: {
            en: 'Dr. Zoe Kelly is a proficient Neurologist with 4 years of experience, focusing on neurological diagnostics in Surakarta. She is skilled in treating Parkinson’s disease, multiple sclerosis, and nerve injuries, employing advanced diagnostic tools to deliver precise treatments and improve patient mobility and cognitive health.',
            id: 'Dr. Zoe Kelly adalah Dokter Saraf terampil dengan pengalaman 4 tahun, fokus pada diagnosis neurologis di Surakarta. Ia menangani penyakit Parkinson, multiple sclerosis, dan cedera saraf dengan alat diagnostik canggih demi meningkatkan mobilitas dan kesehatan kognitif pasien.'
        },
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
        speciality: { 
            en: 'Gastroenterologist', 
            id: 'Dokter Penyakit Dalam' 
        },
        degree: { 
            en: 'MD, Sp.PD-KGEH (Gastroenterology)', 
            id: 'MD, Sp.PD-KGEH (Gastroenterologi)' 
        },
        experience: { 
            en: '4 Years', 
            id: '4 Tahun' 
        },
        about: {
            en: 'Dr. Patrick Harris is an experienced Gastroenterologist with 4 years of expertise, specializing in digestive disorders in Malang. He provides advanced care for ulcers, pancreatitis, and colorectal issues, integrating modern medical technology with personalized dietary plans to enhance digestive system recovery.',
            id: 'Dr. Patrick Harris adalah Dokter Gastroenterologi berpengalaman 4 tahun, spesialis gangguan pencernaan di Malang. Ia menangani tukak lambung, pankreatitis, dan masalah kolorektal dengan teknologi medis mutakhir dan rencana diet khusus untuk pemulihan sistem pencernaan.'
        },
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
        speciality: { 
            en: 'General physician', 
            id: 'Dokter Umum' 
        },
        degree: { 
            en: 'MD (General Practitioner)', 
            id: 'MD (Dokter Umum)' 
        },
        experience: { 
            en: '4 Years', 
            id: '4 Tahun' 
        },
        about: {
            en: 'Dr. Chloe Evans is a dedicated General Physician with 4 years of experience, offering comprehensive health care in Batam. She excels in managing acute illnesses, conducting health screenings, and providing lifestyle counseling, ensuring patients receive thorough and compassionate medical attention.',
            id: 'Dr. Chloe Evans adalah Dokter Umum berdedikasi dengan pengalaman 4 tahun, memberikan perawatan kesehatan menyeluruh di Batam. Ia unggul dalam menangani penyakit akut, skrining kesehatan, dan konseling gaya hidup dengan perhatian medis yang menyeluruh.'
        },
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
        speciality: { 
            en: 'Gynecologist', 
            id: 'Dokter Kandungan' 
        },
        degree: { 
            en: 'MD, Sp.OG (Obstetrics & Gynecology)', 
            id: 'MD, Sp.OG (Kebidanan & Kandungan)' 
        },
        experience: { 
            en: '3 Years', 
            id: '3 Tahun' 
        },
        about: {
            en: 'Dr. Ryan Martinez is a knowledgeable Gynecologist with 3 years of experience, focusing on women’s health in Pekanbaru. He specializes in prenatal care, hormonal therapy, and minimally invasive surgeries, delivering high-quality care with a focus on patient comfort and long-term health outcomes.',
            id: 'Dr. Ryan Martinez adalah Dokter Kandungan berpengetahuan dengan pengalaman 3 tahun, fokus pada kesehatan wanita di Pekanbaru. Ia ahli dalam perawatan prenatal, terapi hormonal, dan operasi invasif minimal dengan kualitas tinggi dan kenyamanan pasien.'
        },
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
        speciality: { 
            en: 'Dermatologist', 
            id: 'Dokter Kulit' 
        },
        degree: { 
            en: 'MD, Sp.KK (Dermatology)', 
            id: 'MD, Sp.KK (Kulit)' 
        },
        experience: { 
            en: '1 Year', 
            id: '1 Tahun' 
        },
        about: {
            en: 'Dr. Amelia Hill is a promising Dermatologist with 1 year of experience, specializing in skin treatments in Manado. She addresses issues like skin infections, aging skin, and laser therapies, offering personalized treatment plans and educating patients on maintaining healthy skin in various climates.',
            id: 'Dr. Amelia Hill adalah Dokter Kulit menjanjikan dengan pengalaman 1 tahun, spesialis perawatan kulit di Manado. Ia menangani infeksi kulit, penuaan kulit, dan terapi laser dengan rencana perawatan personal serta edukasi pasien untuk menjaga kesehatan kulit di berbagai iklim.'
        },
        fees: 30000,
        address: {
            line1: 'Jalan Sam Ratulangi No. 80',
            line2: 'Manado'
        }
    },
]
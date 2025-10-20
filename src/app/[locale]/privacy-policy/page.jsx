"use client";
import FloatButton from "@/components/Elements/FloatButton";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import React from "react";

const PrivacyPolicy = () => {
  const locale = useLocale();

  return (
    <>
      <section className="pt-8 pb-15 lg:pb-22 flex flex-col privacy-policy">
        {locale === "en" ? (
          <div className=" container flex flex-col mx-auto items-center">
            <div className="w-full lg:w-10/12 flex flex-col">
              <h1>Privacy Policy</h1>
              <p>Effective Date: 17 October 2024</p>

              <p>
                PT SECOM INDONESIA ("Company", "we", "our", or "us") is
                committed to protecting the privacy and personal data of
                individuals in accordance with applicable laws and regulations,
                including Indonesia's Personal Data Protection Law (Law No. 27
                of 2022) and international standards such as ISO/IEC 27001.
              </p>

              <p>
                This Privacy Policy outlines how we collect, use, disclose, and
                safeguard personal data in the course of our business
                operations.
              </p>

              <h2>1. Purpose</h2>
              <p>
                This Policy establishes our principles and practices for the
                protection of personal and sensitive data. It reflects our
                commitment to ensuring the confidentiality, integrity, and
                availability of personal data processed by the Company and its
                subsidiaries.
              </p>

              <h2>2. Scope</h2>
              <p>
                This Policy applies to all employees, management, contractors,
                vendors, and authorized users who access or process personal
                data on behalf of the Company. It covers data collected from
                customers, employees, business partners, and other stakeholders.
              </p>

              <h2>3. Principles of Data Protection</h2>
              <ul>
                <li>
                  Lawfulness, Fairness, and Transparency: Data is processed
                  lawfully, fairly, and in a transparent manner.
                </li>
                <li>
                  Purpose Limitation: Data is collected for specified, explicit,
                  and legitimate purposes.
                </li>
                <li>
                  Data Minimization: Only data necessary for the intended
                  purpose is collected.
                </li>
                <li>
                  Accuracy: Reasonable steps are taken to ensure data is
                  accurate and up to date.
                </li>
                <li>
                  Storage Limitation: Data is retained only as long as necessary
                  for the purposes for which it was collected.
                </li>
                <li>
                  Integrity and Confidentiality: Data is secured against
                  unauthorized access, loss, or destruction.
                </li>
                <li>
                  Accountability: We are responsible for and able to demonstrate
                  compliance with data protection obligations.
                </li>
              </ul>

              <h2>4. Legal Basis for Processing</h2>
              <ol>
                <li>Consent from the data subject</li>
                <li>Performance of a contract</li>
                <li>Compliance with legal obligations</li>
                <li>Protection of vital interests</li>
                <li>Legitimate interests pursued by the Company</li>
              </ol>

              <h2>5. Data Collection and Consent</h2>
              <ol>
                <li>
                  We obtain clear and informed consent where required by law.
                </li>
                <li>
                  Special care is taken when processing data of children or
                  minors, including obtaining parental or guardian consent as
                  necessary.
                </li>
              </ol>

              <h2>6. Data Subject Rights</h2>
              <p>Under applicable laws, individuals have the right to:</p>
              <ol>
                <li>Access their personal data</li>
                <li>
                  Request correction or deletion of inaccurate or outdated data
                </li>
                <li>
                  Object to or restrict processing under certain conditions
                </li>
                <li>Withdraw consent at any time</li>
                <li>
                  Request data portability in a structured, commonly used, and
                  machine-readable format
                </li>
              </ol>
              <p>
                Requests can be submitted to our Data Protection Officer
                (contact details below).
              </p>

              <h2>7. Data Security and Breach Response</h2>
              <ul>
                <li>Encryption and access controls</li>
                <li>Regular security assessments</li>
                <li>
                  Incident response and breach notification procedures in
                  compliance with legal requirements
                </li>
              </ul>

              <h2>8. Third-Party Processors</h2>
              <p>
                When engaging third-party service providers to process personal
                data on our behalf, we ensure:
              </p>
              <ol>
                <li>Binding agreements are in place</li>
                <li>Compliance with applicable data protection laws</li>
                <li>Adequate safeguards are implemented</li>
              </ol>

              <h2>9. Training and Awareness</h2>
              <p>
                We provide regular training to employees, contractors, and
                relevant stakeholders to ensure awareness and compliance with
                data protection obligations.
              </p>

              <h2>10. Roles and Responsibilities</h2>
              <ol>
                <li>
                  Data Protection Officer (DPO): Oversees compliance, manages
                  data protection risks, and serves as the point of contact for
                  data subjects and regulators.
                </li>
                <li>
                  Employees and Users: Must comply with this Policy and report
                  any data protection concerns or incidents.
                </li>
              </ol>

              <h2>11. Compliance and Enforcement</h2>
              <p>
                Non-compliance with this Policy may result in disciplinary
                action and legal consequences in accordance with applicable laws
                and internal regulations.
              </p>

              <h2>12. Policy Review</h2>
              <p>
                This Policy is reviewed annually or as needed to reflect changes
                in legal, regulatory, or operational requirements. Updates will
                be communicated to all relevant parties.
              </p>

              <h2>Contact Us</h2>
              <p>
                For questions or concerns regarding this Policy or your personal
                data, please contact our Data Protection Officer at:
              </p>
              <Link
                className="mb-4"
                href="mailto:legal@secom.co.id"
                target="_blank"
              >
                Email: legal@secom.co.id
              </Link>
              <p>
                Address: Mangkuluhur City Tower One, 8th Floor, Jl. Jend. Gatot
                Subroto Kav. 1-3, Jakarta Selatan 12930, Indonesia
              </p>
            </div>
          </div>
        ) : (
          <div className=" container flex flex-col mx-auto items-center">
            <div className="w-full lg:w-10/12 flex flex-col">
              <h1>Kebijakan Privasi</h1>
              <p>Tanggal Berlaku: 17 Oktober 2024</p>

              <p>
                PT SECOM INDONESIA ("Perusahaan", "kami", "kita", atau "milik
                kami") berkomitmen untuk melindungi privasi dan data pribadi
                individu sesuai dengan hukum dan peraturan yang berlaku,
                termasuk Undang-Undang Pelindungan Data Pribadi Indonesia
                (Undang-Undang No. 27 Tahun 2022) dan standar internasional
                seperti ISO/IEC 27001.
              </p>

              <p>
                Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan,
                menggunakan, mengungkapkan, dan melindungi data pribadi dalam
                kegiatan bisnis kami.
              </p>

              <h2>1. Tujuan</h2>
              <p>
                Kebijakan ini menetapkan prinsip dan praktik kami untuk
                pelindungan data pribadi dan sensitif. Ini mencerminkan komitmen
                kami untuk memastikan kerahasiaan, integritas, dan ketersediaan
                data pribadi yang diproses oleh Perusahaan dan anak
                perusahaannya.
              </p>

              <h2>2. Cakupan</h2>
              <p>
                Kebijakan ini berlaku untuk semua karyawan, manajemen,
                kontraktor, vendor, dan pengguna yang berwenang yang mengakses
                atau memproses data pribadi atas nama Perusahaan. Ini mencakup
                data yang dikumpulkan dari pelanggan, karyawan, mitra bisnis,
                dan pemangku kepentingan lainnya.
              </p>

              <h2>3. Prinsip Pelindungan Data</h2>
              <ul>
                <li>
                  Kewajaran, Keterbukaan, dan Transparansi: Data diproses secara
                  sah, adil, dan transparan.
                </li>
                <li>
                  Pembatasan Tujuan: Data dikumpulkan untuk tujuan yang
                  ditentukan, eksplisit, dan sah.
                </li>
                <li>
                  Minimalisasi Data: Hanya data yang diperlukan untuk tujuan
                  yang dimaksud yang dikumpulkan.
                </li>
                <li>
                  Akurasi: Langkah-langkah yang wajar diambil untuk memastikan
                  data akurat dan terbaru.
                </li>
                <li>
                  Pembatasan Penyimpanan: Data disimpan hanya selama diperlukan
                  untuk tujuan pengumpulannya.
                </li>
                <li>
                  Integritas dan Kerahasiaan: Data dilindungi dari akses,
                  kehilangan, atau penghancuran yang tidak sah.
                </li>
                <li>
                  Akuntabilitas: Kami bertanggung jawab dan mampu menunjukkan
                  kepatuhan terhadap kewajiban pelindungan data.
                </li>
              </ul>

              <h2>4. Dasar Hukum untuk Pemrosesan</h2>
              <ol>
                <li>Persetujuan dari subjek data</li>
                <li>Pelaksanaan kontrak</li>
                <li>Kepatuhan terhadap kewajiban hukum</li>
                <li>Pelindungan kepentingan vital</li>
                <li>Kepentingan sah yang dikejar oleh Perusahaan</li>
              </ol>

              <h2>5. Pengumpulan Data dan Persetujuan</h2>
              <ol>
                <li>
                  Kami memperoleh persetujuan yang jelas dan terinformasi jika
                  diwajibkan oleh hukum.
                </li>
                <li>
                  Perhatian khusus diberikan saat memproses data anak-anak atau
                  minor, termasuk memperoleh persetujuan orang tua atau wali
                  jika diperlukan.
                </li>
              </ol>

              <h2>6. Hak Subjek Data</h2>
              <p>
                Berdasarkan hukum yang berlaku, individu memiliki hak untuk:
              </p>
              <ol>
                <li>Mengakses data pribadi mereka</li>
                <li>
                  Meminta koreksi atau penghapusan data yang tidak akurat atau
                  usang
                </li>
                <li>
                  Menolak atau membatasi pemrosesan dalam kondisi tertentu
                </li>
                <li>Menarik persetujuan kapan saja</li>
                <li>
                  Meminta portabilitas data dalam format yang terstruktur, umum
                  digunakan, dan dapat dibaca mesin
                </li>
              </ol>
              <p>
                Permintaan dapat diajukan kepada Petugas Pelindungan Data kami
                (detail kontak di bawah).
              </p>

              <h2>7. Keamanan Data dan Tanggapan Pelanggaran</h2>
              <ul>
                <li>Enkripsi dan kontrol akses</li>
                <li>Penilaian keamanan secara berkala</li>
                <li>
                  Prosedur tanggapan insiden dan pemberitahuan pelanggaran
                  sesuai dengan persyaratan hukum
                </li>
              </ul>

              <h2>8. Pemroses Pihak Ketiga</h2>
              <p>
                Saat melibatkan penyedia layanan pihak ketiga untuk memproses
                data pribadi atas nama kami, kami memastikan:
              </p>
              <ol>
                <li>Perjanjian yang mengikat ada</li>
                <li>Kepatuhan terhadap hukum pelindungan data yang berlaku</li>
                <li>Pengamanan yang memadai diterapkan</li>
              </ol>

              <h2>9. Pelatihan dan Kesadaran</h2>
              <p>
                Kami menyediakan pelatihan rutin kepada karyawan, kontraktor,
                dan pemangku kepentingan yang relevan untuk memastikan kesadaran
                dan kepatuhan terhadap kewajiban pelindungan data.
              </p>

              <h2>10. Peran dan Tanggung Jawab</h2>
              <ol>
                <li>
                  Petugas Pelindungan Data (DPO): Mengawasi kepatuhan, mengelola
                  risiko pelindungan data, dan menjadi titik kontak untuk subjek
                  data dan regulator.
                </li>
                <li>
                  Karyawan dan Pengguna: Harus mematuhi Kebijakan ini dan
                  melaporkan setiap kekhawatiran atau insiden pelindungan data.
                </li>
              </ol>

              <h2>11. Kepatuhan dan Penegakan</h2>
              <p>
                Ketidakpatuhan terhadap Kebijakan ini dapat mengakibatkan
                tindakan disipliner dan konsekuensi hukum sesuai dengan hukum
                yang berlaku dan peraturan internal.
              </p>

              <h2>12. Tinjauan Kebijakan</h2>
              <p>
                Kebijakan ini ditinjau setiap tahun atau sesuai kebutuhan untuk
                mencerminkan perubahan dalam persyaratan hukum, peraturan, atau
                operasional. Pembaruan akan dikomunikasikan kepada semua pihak
                yang relevan.
              </p>

              <h2>Hubungi Kami</h2>
              <p>
                Untuk pertanyaan atau kekhawatiran mengenai Kebijakan ini atau
                data pribadi Anda, silakan hubungi Petugas Pelindungan Data kami
                di:
              </p>
              <Link
                className="mb-4"
                href="mailto:legal@secom.co.id"
                target="_blank"
              >
                Email: legal@secom.co.id
              </Link>
              <p>
                Alamat: Mangkuluhur City Tower One, Lantai 8, Jl. Jend. Gatot
                Subroto Kav. 1-3, Jakarta Selatan 12930, Indonesia
              </p>
            </div>
          </div>
        )}
      </section>
      <FloatButton />
    </>
  );
};

export default PrivacyPolicy;

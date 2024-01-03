import { Card, CardBody } from "@chakra-ui/react"
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <>
      <Card className="mt-5">
        <CardBody>
          <div className="flex gap-3">
            <p className="text-sm">Developed by Tajul .</p>
            <FaGithub size="20" />
            <FaLinkedin size="20" />
            <FaFacebook size="20" />
            <FaInstagram size="20" />
          </div>

          <div className="flex items-center">
            <div className="text-sm text-slate-400">
              Didukung oleh
              <img src="../public/dw.icon.png" alt="" width="22" />
              Dumbways Indonesia . #1 Kursus Pemrograman
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default Footer

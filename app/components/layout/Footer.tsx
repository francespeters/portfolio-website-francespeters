import { BiMailSend, BiPaperPlane } from "react-icons/bi";
import { FaGithub, FaLinkedin, FaPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-brand-ink mt-20">
      <div className="mx-auto max-w-[1400px] px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-5">
                    <div className="mail">
                        <a target="_blank" href="https://www.linkedin.com/in/frances-h-peters">
                            <FaLinkedin size={27} color="#121212" />
                        </a> 
                    </div>
                    <div className="mail">
                        <a target="_blank" href="https://github.com/francespeters">
                            <FaGithub size={27} color="#121212" />
                        </a> 
                    </div>
                    <div className="mail">
                        <a target="_blank" href="mailto:petersfrances3@gmail.com">
                            <BiPaperPlane size={27} color="#121212" />
                        </a> 
                    </div>
        </div>
      </div>
    </footer>
  );
}
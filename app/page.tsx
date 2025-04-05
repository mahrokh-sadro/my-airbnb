import Modal from "./components/modal/modal";
import RegisterModal from "./components/modal/RegisterModal";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {/* <Modal isOpen={true} actionLabel={"aaaaaaaaa"} /> */}
      <RegisterModal isOpen={true} actionLabel={"aaaaaaaaa"} />
    </div>
  );
}

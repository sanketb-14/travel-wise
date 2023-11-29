
import LogoIcon from '../assets/Logo1.svg'

export default function 
Logo() {
  return (
    <div className="flex hover:rounded-xl ">
      <img src={LogoIcon} alt="travelwise" />
      <h1 className="text-3xl font-bold whitespace-nowrap p-2">Travel-Wise</h1>
    </div>
  );
}



export default function City({ country }) {
//   const { country } = city;



  return (
    <li className="rounded-l flex justify-between shadow-lg my-4 p-2 w-96 border-l-4 border-0 border-secondary outline-0">
      {/* <span>{emoji}</span> */}
      <div>
        <h3 className="font-bold">{country}</h3>
      </div>
      <button className="btn btn-sm">&times;</button>
    </li>
  );
}

const options = ["create", "read", "update", "delete"];

export default function Navbar({ onSelect }) {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <ul className="flex gap-6">
        {options.map((option) => (
          <li key={option}>
            <button
              onClick={() => onSelect(option)}
              className="hover:underline capitalize"
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

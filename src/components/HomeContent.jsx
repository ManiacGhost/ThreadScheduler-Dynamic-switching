export default function HomeContent({ data }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Content</h2>
      <ul className="space-y-2">
        {data.length > 0 ? (
          data.map((item, index) => (
            <li key={index} className="bg-white p-4 shadow rounded">
              {typeof item === "object" ? JSON.stringify(item) : item}
            </li>
          ))
        ) : (
          <li>No data available.</li>
        )}
      </ul>
    </div>
  );
}

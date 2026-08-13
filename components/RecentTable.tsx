interface Props {
  title: string;
  data: any[];
}

export default function RecentTable({
  title,
  data,
}: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-bold mb-4">
        {title}
      </h2>

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item._id}
            className="border-b pb-2"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
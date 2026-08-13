interface Props {
  title: string;
  value: number;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-gray-500">
        {title}
      </h2>

      <p className="text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}
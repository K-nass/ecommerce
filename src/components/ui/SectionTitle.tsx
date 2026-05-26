export default function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="font-bold text-md md:text-xl mb-4 cursor-default">
      {title}
    </h3>
  );
}

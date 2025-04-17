"use client";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results",
  subtitle = "Try adjusting your search or filter",
}) => {
  return (
    <div className="h-[60vh] flex flex-col justify-center items-center text-center px-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default EmptyState;

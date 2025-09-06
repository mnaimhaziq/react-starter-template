import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/api";

// Define type for user
type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export const Route = createFileRoute("/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, error, isFetching } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => apiClient.get<User[]>("/users"),
  });

  if (isPending) return <div>Loading...</div>;

  if (error instanceof Error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Users</h1>
      <ul className="space-y-2">
        {data?.map((user) => (
          <li
            key={user.id}
            className="p-2 border rounded-md shadow-sm hover:bg-gray-50"
          >
            <p>
              <strong>{user.name}</strong> ({user.username})
            </p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
      <div className="mt-2 text-sm text-gray-500">
        {isFetching ? "Updating..." : ""}
      </div>
    </div>
  );
}

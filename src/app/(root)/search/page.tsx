import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, fetchUsers } from "@/lib/actions";
import { UserCard } from "@/components/cards";

export default async function SearchPage() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    page: 1,
    size: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                image={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

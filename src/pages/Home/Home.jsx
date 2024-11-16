import Swal from "sweetalert2";
import {
  useDeleteMembersMutation,
  useGetMembersQuery,
} from "../../redux/features/api/memberApi";
import { useDispatch } from "react-redux";
import { removeMember } from "../../redux/features/memberSlice";
import { Link } from "react-router-dom";

const Home = () => {
  // states && datas
  const { data, isLoading } = useGetMembersQuery();
  const [deleteMembers] = useDeleteMembersMutation();
  const dispatch = useDispatch();

  // handle loading
  if (isLoading) {
    return <p className="text-2xl text-center font-bold p-2">loading</p>;
  }

  // handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      color: "white",
      background: "black",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMembers(id)
          .unwrap()
          .then(() => {
            dispatch(removeMember());

            Swal.fire({
              icon: "success",
              title: "Member Deleted",
              text: `Super Hero Removed Successfully`,
              confirmButtonText: "OK",
              color: "white",
              background: "black",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: error.message || "Something went wrong. Please try again.",
              confirmButtonText: "Retry",
              background: "black",
              color: "white",
            });
          });
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-black overflow-hidden">
      <div className="w-4/5 min-h-full mx-auto my-10">
        <h1 className="text-white font-bold text-2xl text-center p-3 mb-5">
          Super Merbers
        </h1>
        {/* table */}
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-white">
                  <th>SL</th>
                  <th>Super Hero</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((member, index) => (
                  <tr key={member._id}>
                    <th>{index + 1}</th>
                    <td>{member.superhero}</td>
                    <td>{member.name}</td>
                    <td>{member.location}</td>
                    <td className="flex items-center gap-2">
                      <Link to={`/updateMembers/${member._id}`}>
                        <div className="btn btn-outline btn-warning">
                          Update
                        </div>
                      </Link>
                      <div
                        onClick={() => handleDelete(member._id)}
                        className="btn btn-outline btn-error"
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import baseApi from "./baseApi";

const memberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => "/members",
      providesTags: ["members"],
    }),
    addMembers: builder.mutation({
      query: (member) => ({
        url: "/members",
        method: "POST",
        body: member,
      }),
      invalidatesTags: ["members"],
    }),
    patchMembers: builder.mutation({
      query: ({id, member}) => ({
        url: `/updateMembers/${id}`,
        method: "PATCH",
        body: member,
      }),
      invalidatesTags: ["members"],
    }),
    deleteMembers: builder.mutation({
      query: (id) => ({
        url: `/members/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["members"],
    }),
  }),
});

export const {
  useGetMembersQuery,
  useAddMembersMutation,
  usePatchMembersMutation,
  useDeleteMembersMutation,
} = memberApi;

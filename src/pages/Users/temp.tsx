// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import BreadCrumb from "@/components/bread-crumb";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/custom/button";
// import useRoles from "@/hooks/useRoles";
// import useUserRegister from "@/hooks/useUserRegister";
// import { User } from "@/store";

// const schema = z.object({
//   firstName: z.string().min(2).max(50),
//   lastName: z.string().min(2).max(50),
//   email: z
//     .string()
//     .min(1, { message: "Please enter your email." })
//     .email({ message: "Invalid email address." }),
//   password: z
//     .string()
//     .min(1, {
//       message: "Please enter your password.",
//     })
//     .min(7, {
//       message: "Password must be at least 7 characters long.",
//     }),
//   roleId: z.string().optional(),
// });

// const RegistUser = () => {
//   const { data, error, isError } = useRoles();
//   const userRegister = useUserRegister();

//   const breadcrumbItems = [
//     { title: "Users", link: "/dashboard/users" },
//     { title: "Register", link: "/dashboard/users/register" },
//   ];

//   const RegistUserFC: React.FC = () => {
//     const form = useForm<z.infer<typeof schema>>({
//       resolver: zodResolver(schema),
//       defaultValues: {
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//         roleId: "",
//       },
//     });

//     const onSubmit = (data: z.infer<typeof schema>) => {
//       console.log(data);
//       userRegister.mutate(data as User);
//     };

//     return (
//       <>
//         <BreadCrumb items={breadcrumbItems} />
//         <div className="flex items-center">
//           <h1 className="text-lg font-semibold md:text-2xl">
//             User Registration
//           </h1>
//         </div>
//         <div className="max-w-4xl">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 <FormField
//                   control={form.control}
//                   name="firstName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>First Name</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="text"
//                           placeholder="First Name"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="lastName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Last Name</FormLabel>
//                       <FormControl>
//                         <Input type="text" placeholder="Last Name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input type="Email" placeholder="Email" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="password"
//                           placeholder="Password"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <div className="colums-1">
//                   {isError && (
//                     <p className="text-red-400">
//                       {error?.response?.data?.message}
//                     </p>
//                   )}
//                   <FormField
//                     control={form.control}
//                     name="roleId"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>
//                           Role
//                           <span className="text-gray-400 pl-1">(Optional)</span>
//                         </FormLabel>
//                         <FormControl>
//                           <Select
//                             onValueChange={field.onChange}
//                             defaultValue={field.value}
//                             value={field.value}
//                           >
//                             <SelectTrigger className="w-[180px]">
//                               <SelectValue placeholder="Select a role" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectGroup>
//                                 <SelectLabel>Role</SelectLabel>
//                                 {data?.data?.map((role) => (
//                                   <SelectItem key={role.id} value={role.id}>
//                                     {role.name}
//                                   </SelectItem>
//                                 ))}
//                               </SelectGroup>
//                             </SelectContent>
//                           </Select>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>
//               <div className="mt-14 flex justify-center sm:justify-end">
//                 <Button
//                   type="submit"
//                   className="px-8 py-2 w-64"
//                   loading={userRegister.isPending}
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </>
//     );
//   };

//   return <RegistUserFC />;
// };

// export default RegistUser;

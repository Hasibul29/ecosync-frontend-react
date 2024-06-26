// import { DotsHorizontalIcon } from "@radix-ui/react-icons";
// import { Row } from "@tanstack/react-table";

// import { Button } from "@/components/custom/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { User } from "@/store";
// // import UpdateUser from "../UpdateUser";
// import { useState } from "react";
// // import { DeleteUser } from "../DeleteUser";

// interface DataTableRowActionsProps {
//   row: Row<User>;
// }

// export function DataTableRowActions({ row }: DataTableRowActionsProps) {

//     const [showUpdateUserDialog, setShowUpdateUserDialog] = useState(false)
//     const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false)



//   return (
//     <>
//     {/* <UpdateUser open={showUpdateUserDialog} onOpenChange={setShowUpdateUserDialog} userData={row.original} />
//     <DeleteUser open={showDeleteUserDialog} onOpenChange={setShowDeleteUserDialog} userData={row.original} /> */}
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="ghost"
//           className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
//         >
//           <DotsHorizontalIcon className="h-4 w-4" />
//           <span className="sr-only">Open menu</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="w-[160px]">
//         <DropdownMenuItem onClick={() => {setShowUpdateUserDialog(true)}} >Edit</DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={() => {
//             navigator.clipboard.writeText(row.original.id ?? "");
//           }}
//         >
//           Copy user id
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           onClick={() => {
//             navigator.clipboard.writeText(JSON.stringify(row.original));
//           }}
//         >
//           Make a copy
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuSeparator />
//         <DropdownMenuItem onClick={() => {setShowDeleteUserDialog(true)}}>Delete</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//     </>
//   );
// }

export const getInitials = (firstName: string, lastName: string) =>
  `${firstName.trim().charAt(0).toUpperCase()}${lastName
    .trim()
    .charAt(0)
    .toUpperCase()}`;

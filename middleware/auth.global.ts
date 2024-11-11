export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();

  // Define an array of public routes (parent routes) that can be accessed without authentication
  const publicRoutes = ["index", "about", "services"];

  // Check if the route is a public parent route
  const isPublicRoute = publicRoutes.includes(to.name as string);

  // If the user is logged out and trying to access a protected route (not in publicRoutes), redirect to login
  if (!user && !isPublicRoute) {
    if (to.name !== "login") {
      return navigateTo("/login");
    }
  }

  // If the user is logged in and trying to access the login page, redirect to user page
  if (user && to.name === "login") {
    return navigateTo("/user");
  }
});

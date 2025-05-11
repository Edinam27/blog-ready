
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { posts, categories, authors } from "@/data/blogData";
import { AreaChart, BarChart } from "@/components/ui/chart-components";

export default function DashboardPage() {
  const totalPosts = posts.length;
  const totalCategories = categories.length;
  const totalAuthors = authors.length;
  const trendingPosts = posts.filter((post) => post.isTrending).length;
  
  // Sample view data for charts
  const viewsData = [
    { name: "Jan", views: 320 },
    { name: "Feb", views: 450 },
    { name: "Mar", views: 380 },
    { name: "Apr", views: 520 },
    { name: "May", views: 780 },
    { name: "Jun", views: 950 },
    { name: "Jul", views: 1100 },
  ];
  
  const categoryData = categories.map((category) => {
    const count = posts.filter((post) => post.category.id === category.id).length;
    return { name: category.name, count };
  });
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your blog admin dashboard
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Authors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAuthors}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Trending Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trendingPosts}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
            <CardDescription>
              Monthly view count for all blog posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <AreaChart
                data={viewsData}
                categories={["views"]}
                index="name"
                colors={["blue"]}
                valueFormatter={(value: number) => `${value} views`}
                className="h-[300px]"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Posts by Category</CardTitle>
            <CardDescription>Number of posts in each category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart
                data={categoryData}
                categories={["count"]}
                index="name"
                colors={["violet"]}
                valueFormatter={(value: number) => `${value} posts`}
                className="h-[300px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-start gap-4">
                <div className="rounded-md bg-primary/10 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{post.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Published by {post.author.name} on{" "}
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

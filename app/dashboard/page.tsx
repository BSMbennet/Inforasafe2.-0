import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Calendar, Download } from "lucide-react"
import Link from "next/link"

// Placeholder CV data - in production this would come from the database
const placeholderCVs = [
  {
    id: "1",
    title: "Software Engineer CV",
    template: "Modern",
    createdAt: "2024-01-15",
    status: "completed",
  },
  {
    id: "2",
    title: "Product Manager CV",
    template: "Professional",
    createdAt: "2024-01-10",
    status: "draft",
  },
]

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userEmail={user.email} />

      <main className="container mx-auto max-w-6xl px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back{user.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your CVs and create new ones with AI assistance.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Create New CV</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Start from scratch with AI assistance
              </p>
              <Button asChild>
                <Link href="/builder">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 font-semibold">Your Plan</h3>
              <Badge variant="secondary" className="mb-2">
                Free
              </Badge>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Upgrade to download PDFs
              </p>
              <Button asChild variant="outline">
                <Link href="/pricing">View Plans</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Total Downloads</h3>
              <p className="mb-2 text-3xl font-bold">0</p>
              <p className="text-center text-sm text-muted-foreground">
                Download your first CV
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CVs List */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your CVs</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/builder">
                <Plus className="mr-2 h-4 w-4" />
                New CV
              </Link>
            </Button>
          </div>

          {placeholderCVs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {placeholderCVs.map((cv) => (
                <Card key={cv.id} className="transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{cv.title}</CardTitle>
                        <CardDescription>{cv.template} template</CardDescription>
                      </div>
                      <Badge
                        variant={cv.status === "completed" ? "default" : "secondary"}
                      >
                        {cv.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(cv.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/preview?id=${cv.id}`}>Preview</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href={`/builder?id=${cv.id}`}>Edit</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">No CVs yet</h3>
                <p className="mb-4 text-center text-muted-foreground">
                  Create your first CV with our AI-powered builder
                </p>
                <Button asChild>
                  <Link href="/builder">Create Your First CV</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

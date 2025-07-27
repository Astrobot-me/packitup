import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddFoodItemForm } from './AddFoodItemForm';

export default function Page() {
  return (
    <Tabs defaultValue="review">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="add">Add/Edit Item</TabsTrigger> 
        <TabsTrigger value="ongoing">Ongoing/Recieved Orders </TabsTrigger>
        <TabsTrigger value="completed">Completed Orders </TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <AddFoodItemForm />
      </TabsContent>
      <TabsContent value="ongoing">
        <Card className="shadow-lg mt-4">
          <CardHeader>
            <CardTitle>Unapproved Submissions</CardTitle>
            <CardDescription>There are currently submissions awaiting review.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
             
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="completed">
        <Card className="shadow-lg mt-4">
          <CardHeader>
            <CardTitle>Published Resources</CardTitle>
            <CardDescription>Manage all public resources.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
    </Tabs>
  )
}

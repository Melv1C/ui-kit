# AI Component Usage Guide

This package ships reusable React components from `@melv1c/ui-kit`.

## Setup

```tsx
import "@melv1c/ui-kit/base.css";
```

Optional theme:

```tsx
import "@melv1c/ui-kit/themes/default.css";
```

## Base Components (`@melv1c/ui-kit`)

### Accordion

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@melv1c/ui-kit";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section</AccordionTrigger>
    <AccordionContent>Content</AccordionContent>
  </AccordionItem>
</Accordion>;
```

### Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from "@melv1c/ui-kit";

<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Something important happened.</AlertDescription>
</Alert>;
```

### AlertDialog

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@melv1c/ui-kit";

<AlertDialog>
  <AlertDialogTrigger>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
```

### Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@melv1c/ui-kit";

<Avatar>
  <AvatarImage src="/avatar.png" alt="User" />
  <AvatarFallback>U</AvatarFallback>
</Avatar>;
```

### Badge

```tsx
import { Badge } from "@melv1c/ui-kit";

<Badge>New</Badge>;
```

### Breadcrumb

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@melv1c/ui-kit";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Settings</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>;
```

### Button

```tsx
import { Button } from "@melv1c/ui-kit";

<Button>Save</Button>;
```

### ButtonGroup

```tsx
import { Button, ButtonGroup } from "@melv1c/ui-kit";

<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button>Right</Button>
</ButtonGroup>;
```

### Calendar

```tsx
import { Calendar } from "@melv1c/ui-kit";

<Calendar mode="single" selected={new Date()} onSelect={() => {}} />;
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@melv1c/ui-kit";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Body</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

### Carousel

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@melv1c/ui-kit";

<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>;
```

### Checkbox

```tsx
import { Checkbox } from "@melv1c/ui-kit";

<Checkbox checked />;
```

### Collapsible

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@melv1c/ui-kit";

<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>;
```

### Command

```tsx
import { Command, CommandInput, CommandList, CommandItem } from "@melv1c/ui-kit";

<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandItem>Profile</CommandItem>
  </CommandList>
</Command>;
```

### ContextMenu

```tsx
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@melv1c/ui-kit";

<ContextMenu>
  <ContextMenuTrigger>Right click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Edit</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>;
```

### Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@melv1c/ui-kit";

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog title</DialogTitle>
      <DialogDescription>Dialog body</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>;
```

### Drawer

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@melv1c/ui-kit";

<Drawer>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer title</DrawerTitle>
    </DrawerHeader>
  </DrawerContent>
</Drawer>;
```

### DropdownMenu

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@melv1c/ui-kit";

<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

### Form

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Input } from "@melv1c/ui-kit";

<Form {...form}>
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>;
```

### HoverCard

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@melv1c/ui-kit";

<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>More details</HoverCardContent>
</HoverCard>;
```

### Input

```tsx
import { Input } from "@melv1c/ui-kit";

<Input placeholder="Type here" />;
```

### Label

```tsx
import { Label, Input } from "@melv1c/ui-kit";

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" />
</div>;
```

### Menubar

```tsx
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@melv1c/ui-kit";

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>;
```

### NavigationMenu

```tsx
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@melv1c/ui-kit";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
      <NavigationMenuContent>Links</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>;
```

### Pagination

```tsx
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@melv1c/ui-kit";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        1
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>;
```

### Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@melv1c/ui-kit";

<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Popover content</PopoverContent>
</Popover>;
```

### Progress

```tsx
import { Progress } from "@melv1c/ui-kit";

<Progress value={60} />;
```

### RadioGroup

```tsx
import { RadioGroup, RadioGroupItem, Label } from "@melv1c/ui-kit";

<RadioGroup defaultValue="a">
  <div>
    <RadioGroupItem value="a" id="r-a" />
    <Label htmlFor="r-a">Option A</Label>
  </div>
</RadioGroup>;
```

### ScrollArea

```tsx
import { ScrollArea } from "@melv1c/ui-kit";

<ScrollArea className="h-24">Long content...</ScrollArea>;
```

### Select

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@melv1c/ui-kit";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose one" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>;
```

### Separator

```tsx
import { Separator } from "@melv1c/ui-kit";

<Separator />;
```

### Sheet

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@melv1c/ui-kit";

<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet title</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>;
```

### Sidebar

```tsx
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@melv1c/ui-kit";

<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>Dashboard</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>;
```

### Skeleton

```tsx
import { Skeleton } from "@melv1c/ui-kit";

<Skeleton className="h-4 w-40" />;
```

### Slider

```tsx
import { Slider } from "@melv1c/ui-kit";

<Slider defaultValue={[50]} max={100} step={1} />;
```

### Sonner

```tsx
import { Toaster } from "@melv1c/ui-kit";

<Toaster />;
```

### Switch

```tsx
import { Switch } from "@melv1c/ui-kit";

<Switch defaultChecked />;
```

### Table

```tsx
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@melv1c/ui-kit";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@melv1c/ui-kit";

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="security">Security content</TabsContent>
</Tabs>;
```

### Textarea

```tsx
import { Textarea } from "@melv1c/ui-kit";

<Textarea placeholder="Write a message" />;
```

### Toggle

```tsx
import { Toggle } from "@melv1c/ui-kit";

<Toggle aria-label="Toggle">B</Toggle>;
```

### ToggleGroup

```tsx
import { ToggleGroup, ToggleGroupItem } from "@melv1c/ui-kit";

<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold">B</ToggleGroupItem>
  <ToggleGroupItem value="italic">I</ToggleGroupItem>
</ToggleGroup>;
```

### Tooltip

```tsx
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@melv1c/ui-kit";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>;
```

## Blocks (`@melv1c/ui-kit`)

### LoginForm

```tsx
import { LoginForm } from "@melv1c/ui-kit";

<LoginForm onSubmit={async (values) => console.log(values)} />;
```

## Custom (`@melv1c/ui-kit`)

### NextButton and PreviousButton

```tsx
import { NextButton, PreviousButton } from "@melv1c/ui-kit";

<div className="flex gap-2">
  <PreviousButton variant="outline" />
  <NextButton />
</div>;
```

### DateTimePicker

```tsx
import { DateTimePicker } from "@melv1c/ui-kit";

<DateTimePicker value={new Date()} onChange={() => {}} />;
```

## Icons (`@melv1c/ui-kit`)

```tsx
import { AppleIcon, FacebookIcon, GithubIcon, GoogleIcon, MicrosoftIcon } from "@melv1c/ui-kit";

<div className="flex gap-2">
  <AppleIcon />
  <FacebookIcon />
  <GithubIcon />
  <GoogleIcon />
  <MicrosoftIcon />
</div>;
```

## Provider (`@melv1c/ui-kit`)

```tsx
import { UIKitProvider } from "@melv1c/ui-kit";

<UIKitProvider>{/* app */}</UIKitProvider>;
```

## Optional Entrypoints

### Code Editors (`@melv1c/ui-kit/code-editors`)

```tsx
import { CodeEditor, CodeDiffEditor } from "@melv1c/ui-kit/code-editors";

<CodeEditor language="typescript" value={"const x = 1;"} onChange={() => {}} />;
<CodeDiffEditor original="const x = 1;" modified="const x = 2;" language="typescript" />;
```

### Rich Text Editor (`@melv1c/ui-kit/rich-text-editor`)

```tsx
import { RichTextEditor } from "@melv1c/ui-kit/rich-text-editor";

<RichTextEditor content="<p>Hello</p>" onChange={() => {}} />;
```

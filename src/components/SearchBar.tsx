import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 focus:ring-2 focus:ring-primary/20"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  );
};
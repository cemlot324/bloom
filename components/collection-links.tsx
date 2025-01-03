import { ArrowRight } from 'lucide-react'

export function CollectionLinks() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="border-t border-black py-6">
        <div className="flex items-center justify-between">
          <a href="#" className="text-lg font-medium hover:text-red-500">
            See the collection
          </a>
          <a href="#" className="flex items-center gap-2 text-lg font-medium hover:text-red-500">
            See More Details
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}


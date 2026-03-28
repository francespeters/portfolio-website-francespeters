
type ItemType = "bowl" | "mug" | "plate" | "decor";

type Item = {
  id: string;
  title: string;
  shop: boolean;
  coverImage: string;
  images?: string[];
  price?: number;
  inStock?: boolean;

  itemType: ItemType;   
  createdYear: string;    
};

export default function ItemGrid() {
    return (
        <div className="grid grid-cols-10 grid-rows-5 gap-4 h-[80vh] max-h-[720px]">
          {/* 1) first square: smaller (2x2) */}
          <div className="col-span-5 row-span-2 bg-gray-200 overflow-hidden content-end">
            <div className="col-span-4 row-span-2  w-[227px]">
              
            </div>

          </div>

          {/* 2) second square: largest (2x2) */}
          <div className="col-span-5 row-span-3 bg-gray-200 overflow-hidden pb-3">
            <div className="w-full h-full overflow-hidden">
                
              </div>
          </div>


          {/* 3) third: taller (1x2) */}
          <div className="col-span-5 row-span-5 bg-gray-200 overflow-hidden ps-[7vw] pe-[7vw]">
            <div className="w-full h-full overflow-hidden">
                
            </div>

            </div>

          {/* 4) fourth: wider (2x1) */}
            <div className="col-span-5 row-span-4 bg-gray-200 overflow-hidden" >
                <div className="flex flex-col items-start gap-[10px] w-[402px] px-[16px] py-[30px] ps-[7vw]">
              
                
                </div>
            </div>
        </div>
    );

}
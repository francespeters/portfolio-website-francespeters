
export default function ItemTag({ text, date }: { text: string, date: string }) {

    return(

        <div className="w-full flex items-center justify-between">
            <div>
                <p className="text-white">{text} </p>
            </div>

            <div>
                <p className="text-white">{date}</p>
            </div>

        </div>
    )


}

export default function RenderingAnArrayOfObjects() {
    const fruits = [
        { id: 1, name: 'Apple' , price: 1.5,stats:[{fresh:false,ripe:true}]},
        { id: 2, name: 'Banana' , price: 0.8,stats:[{fresh:true,ripe:true}]},
        { id: 3, name: 'Cherry' , price: 2.0,stats:[{fresh:'yes',ripe:'no'}]},
    ];
    return (
        <div>
            <h1>Rendering an Array of Objects in React</h1>
            <h2>{fruits[2].stats[0].fresh}</h2> {/* This will display 'yes' = accessing an object within the array */}
            <ul>
                {fruits.map((fruit) => (
                    <li key={fruit.id}>
                        {fruit.name} - ${fruit.price.toFixed(2)}
                        {fruit.stats && (
                            <ul>
                                {fruit.stats.map((stat, index) => (
                                    <li key={index}>
                                        {stat.fresh ? 'Fresh' : 'Not Fresh'} - {stat.ripe ? 'Ripe' : 'Not Ripe'}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
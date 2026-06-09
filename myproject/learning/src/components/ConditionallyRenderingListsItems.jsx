export default function ConditionallyRenderingListComponents({ items }) {
    const excellent = items.filter((item) => item >= 80);
    const average = items.filter((item) => item >= 50 && item < 80);
    const poor = items.filter((item) => item < 50);

    
    return (
        <div>
            <>Conditionally Rendering List Components</>
            
            <h1>Grades</h1>
            {items.length > 0 ? (
                <div>
                    <h3>List of Grades:</h3>
                <ul>
                    
                    {excellent.length > 0 && (
                        <li>
                            <h4>Excellent:</h4>
                            <ul>
                                {excellent.map((item, index) => (
                                    <li key={index}> {item}</li>
                                ))}
                            </ul>
                        </li>
                    )}
                    {average.length > 0 && (
                        <li>
                            <h4>Average:</h4>
                            <ul>
                                {average.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </li>
                    )}
                    {poor.length > 0 && (
                        <li>
                            <h4>Poor:</h4>
                            <ul>
                                {poor.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </li>
                    )}
                </ul>
                </div>
                
            ) : (
                <p>No items to display.</p>
            )}
            
        </div>
    );
}
function GenerateId() {
    const length = 9;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }

    return id;
};
export default function RenderingArrays() {
    const fruits = ['Apple', 445, 'Cherry'];
    
    return (
        <div>
            <h1>Rendering Arrays in React</h1>
            <ol>
                {fruits.map((item, index) => {
                    const id = GenerateId();
                    return (
                        <li key={id}>
                            {item}
                            {console.log(id)}
                        </li>
                    );
                })}
            </ol>
              
        </div>
    )
}
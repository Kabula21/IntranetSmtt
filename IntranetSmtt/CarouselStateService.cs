public class CarouselGroup
{
    public string LinkMateria { get; set; } = "";
    public string LinkImagem { get; set; } = "";
    public string TextoMateria { get; set; } = "";
}

public class CarouselStateService
{
    public CarouselGroup Carrossel1 { get; set; } = new CarouselGroup();
    public CarouselGroup Carrossel2 { get; set; } = new CarouselGroup();
    public CarouselGroup Carrossel3 { get; set; } = new CarouselGroup();
}

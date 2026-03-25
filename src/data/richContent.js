// Rich content data for İyilik Akademi lessons
// Maps lesson ID to enriched content

export const richContent = {
  1: {
    // Doğruluk ve Dürüstlük
    tema: 'Doğruluk ve Emaneti Koruma',
    ogrenmeHedefleri: [
      'Emanet kavramını anlayabilecek ve başkalarının eşyalarına neden saygı göstermemiz gerektiğini fark edebileceksin.',
      'Dürüstlüğün günlük hayatta nasıl uygulanacağını öğrenebilecek ve doğru davranışı seçebileceksin.',
      'Kimsenin görmediği anlarda bile doğru olanı yapmanın önemini kavrayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Emanet',
        anlam: 'Güvenilir bir kişiye koruması için geçici olarak bırakılan eşya veya değer.',
      },
      {
        kavram: 'Dürüstlük',
        anlam: 'Özü ve sözü bir olmak, yalan söylememek ve hile yapmamak.',
      },
    ],
    guzelSoz: {
      metin: 'Doğru söyleyeni dokuz köyden kovarlar ama onuncu köyde baş tacı ederler.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize dürüst insanın başlangıçta zorluk çekebileceğini ama sonunda her zaman kazanacağını öğretiyor. Dürüstlük bazen zor olabilir ama doğru olan her zaman güzeldir. Doğru söyleyen insan sonunda herkesin güvenini kazanır.',
    },
    girisKancasi: {
      soru: "Yolda yürürken içi para dolu bir cüzdan bulsan ve kimse seni görmüyor olsa, ilk ne yapardın?",
      ipucu: "Cevabını düşün ve videoyu izlemeye başla. Bakalım Kabe'deki genç adam ne yapmış?",
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 45,
        tip: 'bilgi_karti',
        metin: "Biliyor muydun? Kabe, Müslümanların kıblesidir ve Mekke şehrinde bulunur. Burada yapılan ibadetler ve iyilikler çok kıymetlidir.",
      },
      {
        zamanDamgasi: 90,
        tip: 'dogru_yanlis',
        soruMetni: 'Genç adam altınları bulduğunda onu kimsenin görmediğini düşünüp altınları cebine saklamıştır.',
        dogruCevap: false,
        geriBildirimDogru: "Harika! O, Allah'ın kendisini her an gördüğünü biliyordu.",
        geriBildirimYanlis: 'Dikkatli izlemedin sanırım. O, emanete dokunmamış ve sahibini aramaya koyulmuştu.',
      },
      {
        zamanDamgasi: 150,
        tip: 'coktan_secmeli',
        soruMetni: "Genç adamın yerinde olsaydın, altınların sahibini bulmak için ne yapardın?",
        secenekler: [
          { id: 'A', metin: 'Sessizce bekler, kimse gelmezse altınları alırdım.', dogruMu: false },
          { id: 'B', metin: 'Yüksek sesle bağırarak veya insanlara sorarak sahibini arardım.', dogruMu: true },
        ],
        geriBildirimDogru: 'Çok doğru. Emaneti sahibine ulaştırmak için gayret etmek gerekir.',
        geriBildirimYanlis: 'Emanet bize ait olmadığı için onu sahibine ulaştırmak için çabalamalıyız.',
      },
    ],
    tefekkurSorulari: [
      'Dürüst olmak bazen zor gelse bile neden her zaman doğruyu seçmeliyiz?',
      "Sana güvenip bir sırrını anlatan arkadaşına karşı nasıl 'emanetçi' olursun?",
    ],
    haftaninGorevi: {
      baslik: 'Emanet Muhafızı',
      aciklama: 'Bugün bir arkadaşından veya ailenden bir eşyayı emanet olarak iste. Onu akşama kadar en güzel şekilde koru ve sapasağlam geri teslim et.',
    },
    kazanilanRozet: 'Güvenilir Kalp Rozeti',
    senaryoSorulari: [
      {
        senaryo: 'Teneffüste arkadaşın masasının üzerinde unuttuğu çok güzel bir silgiyi görüyorsun. Etrafta kimse yok ve o silgiyi çok beğeniyorsun.',
        soru: 'Sen olsan ne yapardın?',
        secenekler: [
          { metin: 'Silgiyi alıp çantama koyardım, nasılsa kimse görmedi.', geribildirim: 'Bu yaklaşım doğru değil çünkü başkasının eşyasını almak emanete ihanet etmektir. Kimse görmese de Allah her şeyi görür.' },
          { metin: 'Silgiyi olduğu yerde bırakır, arkadaşıma söylerdim.', geribildirim: 'Bu da düşünülebilir ama arkadaşın gelmeden silgi kaybolabilir.' },
          { metin: 'Silgiyi alıp arkadaşıma teslim ederdim veya öğretmenime verirdim.', geribildirim: 'Harika! Çünkü emaneti korumak ve sahibine ulaştırmak dürüst bir insanın en güzel özelliğidir.' },
        ],
        enIyiSecenek: 2,
      },
    ],
  },

  2: {
    // Saygı
    tema: "Peygamber Efendimizin (s.a.v) Soyuna ve Büyüklere Saygı",
    ogrenmeHedefleri: [
      'Büyüklere ve ilim sahiplerine neden saygı göstermemiz gerektiğini anlayabileceksin.',
      'Peygamber Efendimizin (s.a.v) soyuna gösterilen hürmetin önemini fark edebileceksin.',
      'Günlük hayatında saygıyı nasıl gösterebileceğini uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Seyyid',
        anlam: "Peygamber Efendimiz Hz. Muhammed'in (s.a.v) soyundan gelen, onun torunları olan kıymetli kimseler.",
      },
      {
        kavram: 'Hürmet / Edep',
        anlam: 'Büyüklere, ilim sahiplerine ve kıymetli insanlara gösterilen derin saygı.',
      },
    ],
    guzelSoz: {
      metin: 'Büyüğünü saymayanı küçüğü de saymaz.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize iki önemli şey öğretiyor: Büyüklerimize saygı göstermeliyiz ki bize de saygı gösterilsin. Saygı, insanları birbirine bağlayan en güçlü bağlardan biridir.',
    },
    girisKancasi: {
      soru: 'Sınıfa öğretmenin girdiğinde veya eve deden geldiğinde onlara saygını nasıl gösterirsin?',
      ipucu: 'Videoda İmam Şafii hazretlerinin çok ince bir saygı örneğini izleyeceğiz.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 30,
        tip: 'bilgi_karti',
        metin: "İmam Şafii hazretleri, İslam dünyasının en büyük âlimlerinden biridir ve hayatı boyunca Peygamberimize (s.a.v) büyük bir sevgi duymuştur.",
      },
      {
        zamanDamgasi: 85,
        tip: 'coktan_secmeli',
        soruMetni: 'İmam Şafii hazretleri ders anlatırken neden aniden defalarca ayağa kalktı?',
        secenekler: [
          { id: 'A', metin: 'Dersten sıkıldığı ve ara vermek istediği için.', dogruMu: false },
          { id: 'B', metin: "Kapının önünde oynayan ve Peygamberimizin soyundan gelen bir çocuğa (Seyyid) hürmetinden dolayı.", dogruMu: true },
        ],
        geriBildirimDogru: "Tebrikler! Peygamber Efendimizin soyuna (Seyyidlere) hürmet etmek çok kıymetli bir edeptir.",
        geriBildirimYanlis: 'Tekrar düşün. O sırada dışarıda oynayan çocukların kim olduğunu hatırlıyor musun?',
      },
      {
        zamanDamgasi: 120,
        tip: 'dogru_yanlis',
        soruMetni: 'Saygı göstermek sadece yaşça bizden büyük olanlara yapılır, küçük çocuklara saygı gösterilmez.',
        dogruCevap: false,
        geriBildirimDogru: 'Çok doğru! İmam Şafii, kendisinden çok küçük bir çocuğa soyundan dolayı saygı göstermiştir. Herkese saygılı olmalıyız.',
        geriBildirimYanlis: "Yanlış cevap. Videoda İmam Şafii'nin kendisinden çok küçük bir çocuğa bile nasıl saygı gösterdiğini gördük.",
      },
    ],
    tefekkurSorulari: [
      "Peygamber Efendimizin (s.a.v) soyundan gelen birini görsen ona nasıl davranırdın?",
      'Evde anne ve babana saygını göstermek için yapabileceğin 3 güzel davranış nedir?',
    ],
    haftaninGorevi: {
      baslik: 'Hürmet ve Nezaket Görevi',
      aciklama: 'Bugün evdeki büyüklerinden birinin yanına gidip elini öp veya öğretmenini gördüğünde ona tebessüm ederek saygıyla selam ver.',
    },
    kazanilanRozet: 'Edep Tacı Rozeti',
    senaryoSorulari: [
      {
        senaryo: 'Otobüste oturuyorsun ve yaşlı bir amca bindi. Etrafta boş koltuk yok. Arkadaşın sana "Otur, sen de yorgunsun" diyor.',
        soru: 'Sen olsan ne yapardın?',
        secenekler: [
          { metin: 'Arkadaşımın dediğini yapıp oturmaya devam ederdim.', geribildirim: 'Bu yaklaşım rahat görünse de büyüklerimize saygı göstermek bizim görevimizdir.' },
          { metin: 'Yerimden kalkıp amcaya "Buyurun oturun" derdim.', geribildirim: 'Harika! Çünkü büyüklere yer vermek saygının ve edepli olmanın en güzel göstergesidir.' },
          { metin: 'Amcayı görmezden gelirdim, o da ayakta durabilir.', geribildirim: 'Bu da düşünülebilir ama büyüklerimize karşı kayıtsız kalmak edebe uygun değildir.' },
        ],
        enIyiSecenek: 1,
      },
    ],
  },

  3: {
    // İhlas
    tema: "İyilikleri Sadece Allah Rızası İçin Yapmak",
    ogrenmeHedefleri: [
      'İhlas kavramını anlayabilecek ve iyilikleri neden sadece Allah rızası için yapmamız gerektiğini öğrenebileceksin.',
      'Gösteriş (riya) ile ihlas arasındaki farkı fark edebileceksin.',
      'Gizli yapılan iyiliklerin neden daha değerli olduğunu kavrayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'İhlas',
        anlam: "İbadetleri ve iyilikleri hiçbir karşılık beklemeden, sırf Allah emrettiği ve O'nun rızasını kazanmak için yapmak.",
      },
      {
        kavram: 'Riya (Gösteriş)',
        anlam: "Başkaları görsün, beğensin ve övsün diye iyilik yapmak. İhlasın zıddıdır.",
      },
    ],
    guzelSoz: {
      metin: 'İyilik yap denize at, balık bilmezse Halik bilir.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize şunu öğretiyor: Bir iyilik yaptığımızda karşılık beklemeden yapmalıyız. Kimse bilmese de yaptığımız iyilikler asla boşa gitmez. Karşılık beklemeden yapılan iyilik en güzel iyiliktir.',
    },
    girisKancasi: {
      soru: 'Bir iyilik yaptığında bunu herkese anlatmak mı istersin, yoksa sır olarak saklamak mı?',
      ipucu: "'İhlas' kelimesinin çok güzel bir sırrı var, hadi izleyelim.",
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 50,
        tip: 'dogru_yanlis',
        soruMetni: "Yaptığımız bir iyiliği arkadaşlarımız görsün ve bizi övsünler diye yaparsak çok daha fazla sevap kazanırız.",
        dogruCevap: false,
        geriBildirimDogru: "Mükemmel! İyilikler sadece Allah rızası için yapılmalıdır, başkalarının övgüsü için değil.",
        geriBildirimYanlis: "Aman dikkat! Başkaları görsün diye yapılan iyiliğe 'gösteriş (riya)' denir ve Allah katında değerini azaltır.",
      },
      {
        zamanDamgasi: 110,
        tip: 'coktan_secmeli',
        soruMetni: "Amellerimizde 'İhlas'ı korumanın en güzel yolu nedir?",
        secenekler: [
          { id: 'A', metin: 'Yaptığımız iyilikleri bir deftere yazıp herkese okumak.', dogruMu: false },
          { id: 'B', metin: "İyiliği yaptıktan sonra unutmak ve sadece Allah'ın bildiğini düşünmek.", dogruMu: true },
        ],
        geriBildirimDogru: 'Çok doğru! İhlas, bir işi sadece ve sadece Allah rızası için yapmaktır.',
        geriBildirimYanlis: 'İyiliklerimizi anlatmak niyetimizi bozabilir. Gizli yapmak daha kıymetlidir.',
      },
      {
        zamanDamgasi: 145,
        tip: 'bilgi_karti',
        metin: "Unutma: Sağ elin verdiğini sol el görmemelidir. Gizli yapılan iyilikler Allah katında parlayan yıldızlar gibidir.",
      },
    ],
    tefekkurSorulari: [
      'Kimsenin seni görmediği bir yerde kurallara uymak veya iyilik yapmak neden daha değerlidir?',
      "İçindeki sese 'bunu Allah için mi yapıyorum, yoksa insanlar görsün diye mi?' sorusunu sormak davranışlarını nasıl değiştirir?",
    ],
    haftaninGorevi: {
      baslik: 'Gizli İyilik Görevi',
      aciklama: "Bugün kimsenin görmediği bir anda, sadece Allah'ın bilmesi niyetiyle gizli bir iyilik yap. (Örn: Sokaktaki bir çöpü çöpe at veya evde kimse görmeden bir eşyayı düzelt.)",
    },
    kazanilanRozet: 'İhlas Kahramanı Rozeti',
    senaryoSorulari: [
      {
        senaryo: 'Okulda yemek artan arkadaşlarına dağıtıyorsun. Öğretmenin seni görünce çok övdü. Ertesi gün arkadaşın "Yine yap, öğretmen yine seni övecek" diyor.',
        soru: 'Sen olsan ne yapardın?',
        secenekler: [
          { metin: 'Öğretmenim görsün diye yine aynı şeyi yapardım.', geribildirim: 'Bu yaklaşım iyi bir başlangıç olsa da başkalarının övgüsü için iyilik yapmak ihlastan uzaklaşmaktır.' },
          { metin: 'Bu sefer kimse görmeden sessizce dağıtırdım.', geribildirim: 'Harika! Çünkü iyiliği gizli yapmak ihlasın en güzel göstergesidir. Allah senin niyetini bilir.' },
          { metin: 'Artık yapmam, herkes benden bunu beklemeye başladı.', geribildirim: 'Bu da düşünülebilir ama iyilik yapmaya devam etmek güzeldir, önemli olan niyetimizdir.' },
        ],
        enIyiSecenek: 1,
      },
    ],
  },

  4: {
    // İşbirliği
    tema: 'Birlikte Çalışmak ve Yardımlaşmak',
    ogrenmeHedefleri: [
      'İşbirliğinin gücünü anlayabilecek ve birlikte çalışmanın tek başına çalışmaktan daha verimli olduğunu fark edebileceksin.',
      'Sadece iyi ve güzel işlerde yardımlaşmamız gerektiğini öğrenebileceksin.',
      'Aile ve okul hayatında işbölümü yaparak görevleri paylaşmayı uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'İşbirliği',
        anlam: 'Bir amaca ulaşmak veya bir işi başarmak için güçleri ve yetenekleri birleştirmek.',
      },
      {
        kavram: 'Dayanışma',
        anlam: 'Topluluk içindeki insanların birbirlerine her konuda destek olması.',
      },
    ],
    guzelSoz: {
      metin: 'Bir elin nesi var, iki elin sesi var.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize birlikte çalışmanın gücünü anlatıyor. Tek başımıza yapamadığımız işleri güçlerimizi birleştirerek kolayca başarabiliriz. Yardımlaşma ve dayanışma bizi güçlü kılar.',
    },
    girisKancasi: {
      soru: 'Tek başına kaldıramadığın ağır bir masayı taşımak için ne yaparsın?',
      ipucu: 'Bazen en zor işler, güçleri birleştirince çok kolaylaşır.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 40,
        tip: 'bilgi_karti',
        metin: 'Karıncalar ve arılar doğadaki en güzel işbirliği örnekleridir. Birlikte çalışarak devasa yuvalar inşa ederler.',
      },
      {
        zamanDamgasi: 90,
        tip: 'coktan_secmeli',
        soruMetni: 'Ayşe ve Emir bahçedeki işi tek başlarına bitirmekte zorlandıklarında ne yapmaları gerekir?',
        secenekler: [
          { id: 'A', metin: 'İşi yarım bırakıp başka bir oyun oynamaya gitmeliler.', dogruMu: false },
          { id: 'B', metin: 'Güçlerini birleştirip aralarında işbölümü yapmalılar.', dogruMu: true },
        ],
        geriBildirimDogru: 'Harika! Birlikten kuvvet doğar.',
        geriBildirimYanlis: 'Zorluklar karşısında pes etmek yerine yardımlaşmayı denemeliyiz.',
      },
      {
        zamanDamgasi: 130,
        tip: 'dogru_yanlis',
        soruMetni: 'Arkadaşlarımız kötü bir şey yapmak istediğinde (örneğin birine zarar vermek) onlarla işbirliği yapmalıyız.',
        dogruCevap: false,
        geriBildirimDogru: 'Çok doğru! Sadece iyilik ve güzel işler üzerine yardımlaşılır.',
        geriBildirimYanlis: 'Unutma, ayette de belirtildiği gibi günah ve kötülük üzerine yardımlaşılmaz.',
      },
    ],
    tefekkurSorulari: [
      'Ailenle birlikte yaptığınız en güzel işbirliği neydi?',
      'Sınıfta temizlik yapılması gerektiğinde arkadaşlarınla nasıl bir işbölümü yaparsın?',
    ],
    haftaninGorevi: {
      baslik: 'Yardımlaşma Görevi',
      aciklama: 'Evde annene, babana veya kardeşine zorlandığı bir işte yardım teklif et ve o işi beraber, işbirliği yaparak bitirin.',
    },
    kazanilanRozet: 'Birlik Madalyası',
    senaryoSorulari: [
      {
        senaryo: 'Sınıfta büyük bir proje ödevi var. Grubundaki bir arkadaşın hiç çalışmıyor ve tüm iş sana kalıyor.',
        soru: 'Sen olsan ne yapardın?',
        secenekler: [
          { metin: 'Arkadaşımı öğretmene şikayet ederdim.', geribildirim: 'Bu da düşünülebilir ama önce arkadaşınla konuşmak daha güzel bir adım olabilir.' },
          { metin: 'Hepsini tek başıma yapardım, arkadaşıma hiç bir şey söylemezdim.', geribildirim: 'Bu yaklaşım seni yorar ve işbirliği ruhu oluşmaz. Sorunları konuşarak çözmek daha iyidir.' },
          { metin: 'Arkadaşımla nazikçe konuşup ona yapabileceği bir görev verirdim.', geribildirim: 'Harika! Çünkü işbirliği herkesin güçlü yanlarını kullanarak birlikte çalışmaktır. Nazikçe iletişim kurmak en güzel yoldur.' },
        ],
        enIyiSecenek: 2,
      },
    ],
  },

  5: {
    // Empati
    tema: 'Empati ve Başkalarını Anlamak',
    ogrenmeHedefleri: [
      'Empati kavramını anlayabilecek ve kendini başkasının yerine koymanın ne demek olduğunu öğrenebileceksin.',
      'Yardım ederken karşındaki insanı incitmeden nasıl davranman gerektiğini fark edebileceksin.',
      'Günlük hayatında arkadaşlarının ve ailenin duygularına karşı daha duyarlı olabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Empati',
        anlam: 'Kendini başkasının yerine koyarak onun ne hissettiğini ve ne düşündüğünü anlamaya çalışmak.',
      },
      {
        kavram: 'Duyargalık',
        anlam: 'Çevremizdeki insanların acılarına, sevinçlerine ve ihtiyaçlarına karşı hassas olmak.',
      },
    ],
    guzelSoz: {
      metin: 'Kendine yapılmasını istemediğin şeyi başkasına yapma.',
      kaynak: '— İmam Gazali',
      aciklama: 'İmam Gazali bu sözüyle bize empatinin temelini öğretiyor: Kendin için ne istiyorsan başkaları için de aynısını istemelisin. Birinin yerine kendini koyduğunda onu çok daha iyi anlarsın.',
    },
    girisKancasi: {
      soru: 'Bir arkadaşının üzgün veya zor durumda olduğunu gördüğünde ona nasıl yardım edebilirsin?',
      ipucu: 'Bazen en büyük yardım, kendini onun yerine koyabilmektir.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 35,
        tip: 'dogru_yanlis',
        soruMetni: 'Ayşe ve Emir, kütüphanede zor durumda olan çocuğu gördüklerinde sadece kendi hallerine şükredip yollarına devam ettiler.',
        dogruCevap: false,
        geriBildirimDogru: 'Doğru. Sadece şükretmek yetmez, aynı zamanda ihtiyacı olana yardım elimizi uzatmalıyız.',
        geriBildirimYanlis: 'Hayır, onlar sadece hallerine şükretmediler, harekete geçip yardım ettiler.',
      },
      {
        zamanDamgasi: 80,
        tip: 'bilgi_karti',
        metin: "Peygamber Efendimiz (s.a.v) her zaman ashabının (arkadaşlarının) dertleriyle dertlenir, onların hislerini paylaşırdı.",
      },
      {
        zamanDamgasi: 125,
        tip: 'coktan_secmeli',
        soruMetni: 'Ayakkabısı olmayan çocuğu gördüğümüzde ona yardım etmenin en güzel yolu nedir?',
        secenekler: [
          { id: 'A', metin: 'Ona acıdığımızı belli edip onu utandırmak.', dogruMu: false },
          { id: 'B', metin: 'Onu hiç incitmeden, sevgiyle ve hediyeleşir gibi yardım etmek.', dogruMu: true },
        ],
        geriBildirimDogru: 'Çok güzel! Yardım ederken kalpleri kırmamak empatinin temelidir.',
        geriBildirimYanlis: 'İnsanlara yardım ederken onları utandırmaktan kaçınmalıyız.',
      },
    ],
    tefekkurSorulari: [
      'Kendini hiç, seninle oynamak isteyen ama utanan bir arkadaşının yerine koydun mu? O ne hissediyor olabilir?',
      'Empati kurmak, birine kızgın olduğumuzda öfkemizi dindirmeye nasıl yardımcı olur?',
    ],
    haftaninGorevi: {
      baslik: 'Empati Görevi',
      aciklama: 'Bugün bir arkadaşının veya kardeşinin yerine kendini koyarak, onun zorlandığı bir konuda ona yardımcı ol.',
    },
    kazanilanRozet: 'Empati Kahramanı',
    senaryoSorulari: [
      {
        senaryo: 'Okulda yeni bir öğrenci geldi. Hiç arkadaşı yok ve teneffüslerde hep yalnız oturuyor. Arkadaşların "Bırak onu, biz kendi aramızda oynayalım" diyor.',
        soru: 'Sen olsan ne yapardın?',
        secenekler: [
          { metin: 'Arkadaşlarımın dediğini yapıp kendi aramızda oynardım.', geribildirim: 'Bu yaklaşım kolay görünse de yalnız kalan arkadaşının ne hissettiğini düşün. O da senin yerinde olabilirdi.' },
          { metin: 'Yeni arkadaşımın yanına gidip onu oyunumuza davet ederdim.', geribildirim: 'Harika! Çünkü kendini onun yerine koyduğunda ne kadar yalnız hissettiğini anlarsın. Onu oyuna dahil etmek empati kahramanlığıdır.' },
          { metin: 'Öğretmenime söylerdim, o halleder.', geribildirim: 'Bu da düşünülebilir ama bazen en güzel yardım, senin kendi elinle yapacağın küçük bir iyiliktir.' },
        ],
        enIyiSecenek: 1,
      },
    ],
  },

  6: {
    // Adalet
    tema: 'Adaletli Olmak ve Haksızlıktan Kaçınmak',
    ogrenmeHedefleri: [
      'Adalet kavramını anlayabilecek ve herkese eşit davranmanın önemini öğrenebileceksin.',
      'Kul hakkının ne demek olduğunu ve haksızlık yapmanın sonuçlarını fark edebileceksin.',
      'Oyunlarda ve paylaşımlarda adaletli davranmayı uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Adalet',
        anlam: 'Her şeye ve herkese hakkını vermek, haksızlıktan kaçınmak ve eşit davranmak.',
      },
      {
        kavram: 'Kul Hakkı',
        anlam: 'İnsanların birbirleri üzerindeki hakları. Haksızlık yapmak kul hakkına girmektir.',
      },
    ],
    guzelSoz: {
      metin: 'Adalet mülkün temelidir.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize adaletin toplumun temeli olduğunu anlatıyor. Adaletli davranmayan toplumlar yıkılır. Herkese eşit ve hakça davranmak en güzel erdemlerden biridir.',
    },
    girisKancasi: {
      soru: 'Bir oyunda arkadaşın haksızlığa uğradığında veya suçsuz yere suçlandığında ne yaparsın?',
      ipucu: 'Haksızlığı düzeltmenin en güzel yolu adalettir.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 40,
        tip: 'bilgi_karti',
        metin: 'Tarihte Fatih Sultan Mehmet gibi büyük liderler, kendi güçlerine rağmen mahkemelerde adalet önünde sıradan bir vatandaş gibi yargılanmışlardır.',
      },
      {
        zamanDamgasi: 85,
        tip: 'coktan_secmeli',
        soruMetni: 'Emir topu kendisi atmasına rağmen suçu arkadaşına atınca nasıl bir davranış sergiledi?',
        secenekler: [
          { id: 'A', metin: 'Adaletsiz ve haksız bir davranış.', dogruMu: true },
          { id: 'B', metin: 'Kendisinin kızılmasını önlediği için akıllıca bir davranış.', dogruMu: false },
        ],
        geriBildirimDogru: 'Çok doğru! Kendi hatamızı başkasına yüklemek büyük bir haksızlıktır.',
        geriBildirimYanlis: 'Başkasına iftira atmak veya haksızlık yapmak hiçbir zaman doğru bir çözüm değildir.',
      },
      {
        zamanDamgasi: 130,
        tip: 'dogru_yanlis',
        soruMetni: 'Sadece tanımadığımız insanlara karşı adil olmalıyız, kendi kardeşimize haksızlık yapsak da önemli değildir.',
        dogruCevap: false,
        geriBildirimDogru: 'Mükemmel. Adalet herkese karşı, hatta kendi ailemize karşı bile uygulanmalıdır.',
        geriBildirimYanlis: 'Yanlış! Adalet ayrım yapmaz, kendi aleyhimize bile olsa adaletten ayrılmamalıyız.',
      },
    ],
    tefekkurSorulari: [
      'Adaletin olmadığı bir oyun oynamak sence keyifli olur muydu? Neden?',
      'Birine haksızlık yaptığını fark ettiğinde bunu düzeltmek için ilk ne yapmalısın?',
    ],
    haftaninGorevi: {
      baslik: 'Adalet Terazisi Görevi',
      aciklama: 'Bugün bir arkadaşınla veya kardeşinle bir şeyi (örneğin yiyecek veya oyuncak) paylaşırken tamamen adil ol ve kimseye haksızlık yapma.',
    },
    kazanilanRozet: 'Adalet Savunucusu Rozeti',
  },

  7: {
    // Sabır
    tema: 'Sabırlı Olmak ve Gayret Etmek',
    ogrenmeHedefleri: [
      'Sabır kavramını anlayabilecek ve zorluklar karşısında pes etmemenin önemini kavrayabileceksin.',
      'Gayret göstermenin ve çalışmanın sabrın bir parçası olduğunu fark edebileceksin.',
      'Günlük hayatında zorlandığın durumlarda sabırlı davranmayı uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Sabır',
        anlam: 'Zorluklar karşısında dayanmak, pes etmemek ve sonucu güzelce beklemek.',
      },
      {
        kavram: 'Gayret',
        anlam: 'Bir işi başarmak için elinden gelen tüm çabayı ve çalışmayı göstermek.',
      },
    ],
    guzelSoz: {
      metin: 'Sabırla koruk helva olur.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize sabrın mucize gibi olduğunu anlatıyor. Acı ve ekşi olan koruk bile zamanla tatlı helvaya dönüşür. Zor anlarda sabretmek, sonunda güzel sonuçlar getirir.',
    },
    girisKancasi: {
      soru: 'Yeni bir oyun öğrenirken hemen başaramadığında pes mi edersin yoksa tekrar mı denersin?',
      ipucu: 'Unutma, sabrın sonunda her zaman güzel bir çiçek açar.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 30,
        tip: 'dogru_yanlis',
        soruMetni: 'Emir iki tekerlekli bisikleti hemen süremediği için üzülmekte haklıydı, çünkü bazı şeyler hiç öğrenilemez.',
        dogruCevap: false,
        geriBildirimDogru: 'Doğru! Her yeni şey zaman ister, pes etmemek gerekir.',
        geriBildirimYanlis: 'Emir pes etmekte acele etti. Bisiklet sürmek gibi yetenekler ancak denedikçe öğrenilir.',
      },
      {
        zamanDamgasi: 75,
        tip: 'bilgi_karti',
        metin: 'Tohumun toprağın altında büyümesi, tırtılın kelebeğe dönüşmesi... Doğadaki tüm güzellikler sabrın bir sonucudur.',
      },
      {
        zamanDamgasi: 120,
        tip: 'coktan_secmeli',
        soruMetni: 'Sabredip çalışmaya devam eden bir insan sonunda ne elde eder?',
        secenekler: [
          { id: 'A', metin: 'Sadece yorulmuş olur.', dogruMu: false },
          { id: 'B', metin: 'Başarıya ulaşır ve sabrının meyvesini yer.', dogruMu: true },
        ],
        geriBildirimDogru: 'Tebrikler! Sabrın sonu selamettir.',
        geriBildirimYanlis: 'Sabır ve gayret hiçbir zaman boşa gitmez.',
      },
    ],
    tefekkurSorulari: [
      'Hayatında en çok neyi öğrenirken sabretmek zorunda kaldın?',
      'Sabırlı olmak insanı öfkelenmekten nasıl korur?',
    ],
    haftaninGorevi: {
      baslik: 'Sabır Çiçeği Görevi',
      aciklama: 'Bugün yapmakta zorlandığın bir işi veya ödevi hemen bırakma. Derin bir nefes al ve sabırla bir kez daha dene.',
    },
    kazanilanRozet: 'Sabır Şampiyonu Rozeti',
  },

  8: {
    // Mahremiyet ve İffet
    tema: 'Özel Hayata Saygı ve İzin İsteme',
    ogrenmeHedefleri: [
      'Mahremiyet kavramını anlayabilecek ve herkesin özel alanına saygı göstermen gerektiğini öğrenebileceksin.',
      'Bir odaya girmeden veya birinin eşyasını almadan önce izin istemenin önemini fark edebileceksin.',
      'Günlük hayatında kapı çalmayı ve izin istemeyi bir alışkanlık haline getirebileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Mahremiyet',
        anlam: "Kişinin kendisine ait olan, başkalarının izinsiz giremeyeceği ve göremeyeceği özel alanı.",
      },
      {
        kavram: 'İzin İsteme (İstizan)',
        anlam: 'Bir başkasının odasına veya evine girmeden önce haber vermek ve onay almak.',
      },
    ],
    guzelSoz: {
      metin: 'Her yiğidin gönlünde bir arslan yatar ama edepli olan onu zincirde tutar.',
      kaynak: '— Şems-i Tebrizi',
      aciklama: 'Şems-i Tebrizi bu sözüyle bize edepli olmanın gücünü anlatıyor. Herkesin içinde güçlü duygular vardır ama gerçek olgunluk, onları kontrol edebilmektir. Başkalarının özel alanına saygı göstermek edebin en güzel göstergesidir.',
    },
    girisKancasi: {
      soru: 'Anne ve babanın odasının kapısı kapalıyken içeri girmek istediğinde ilk olarak ne yaparsın?',
      ipucu: 'Edep, sadece güzel konuşmak değil, aynı zamanda saygı göstermektir.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 40,
        tip: 'bilgi_karti',
        metin: "İslam dinine göre bir kapıyı en fazla 3 defa çalmalı veya seslenmeliyiz. Cevap gelmezse veya 'müsait değiliz' denirse ısrar etmeden geri dönmeliyiz.",
      },
      {
        zamanDamgasi: 90,
        tip: 'coktan_secmeli',
        soruMetni: 'Ayşe annesinin odasına girmeden önce dedesinin hangi öğüdünü hatırladı ve nasıl davrandı?',
        secenekler: [
          { id: 'A', metin: 'Kapıyı tıklatıp izin alarak içeri girdi.', dogruMu: true },
          { id: 'B', metin: 'Kapıyı doğrudan açıp hemen annesinin yanına gitti.', dogruMu: false },
        ],
        geriBildirimDogru: 'Çok güzel! Başkasının odasına girerken izin istemek edep ve mahremiyetin kuralıdır.',
        geriBildirimYanlis: 'Unutma, kapalı bir kapı gördüğümüzde mutlaka önce izin istemeliyiz.',
      },
      {
        zamanDamgasi: 130,
        tip: 'dogru_yanlis',
        soruMetni: 'Sadece anne ve babamızın odasına girerken izin almalıyız, kardeşlerimizin odasına izinsiz girebiliriz.',
        dogruCevap: false,
        geriBildirimDogru: 'Harika! Herkesin özel alanı vardır. Kardeşimizin odasına da izinsiz girmemeliyiz.',
        geriBildirimYanlis: 'Hayır, kardeşlerimizin eşyalarına ve özel alanlarına da saygı duymalı ve izin istemeliyiz.',
      },
    ],
    tefekkurSorulari: [
      'Birisi senin odana veya günlüğüne izinsiz baksa ne hissederdin?',
      'Özel eşyalarımızı ve vücudumuzu başkalarından korumak neden önemlidir?',
    ],
    haftaninGorevi: {
      baslik: 'Saygı ve İzin Görevi',
      aciklama: 'Bugün evde birinin odasına girerken veya bir eşyasını ödünç alırken mutlaka önce izin iste.',
    },
    kazanilanRozet: 'Edep ve Haya İncisi Rozeti',
  },

  9: {
    // Tevekkül
    tema: "Elinden Geleni Yapıp Sonucu Allah'a Bırakmak",
    ogrenmeHedefleri: [
      'Tevekkül kavramını anlayabilecek ve tembellik ile tevekkül arasındaki farkı öğrenebileceksin.',
      'Önce çalışıp sonra sonucu Allah\'a bırakmanın önemini fark edebileceksin.',
      'Sınavlarda ve günlük işlerde gereksiz kaygıdan kurtulmak için tevekkülü uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Tevekkül',
        anlam: "Bir iş için gereken tüm çabayı gösterdikten sonra sonucu Allah'a bırakmak ve O'na güvenmek.",
      },
      {
        kavram: 'Sorumluluk',
        anlam: 'Kişinin kendi üzerine düşen görevleri eksiksiz bir şekilde yerine getirmesi.',
      },
    ],
    guzelSoz: {
      metin: 'Deveyi bağla, ondan sonra tevekkül et.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize önce elimizden gelen çabayı göstermemiz gerektiğini öğretiyor. Hiçbir şey yapmadan sonuç beklemek tembellik olur. Önce çalış, elinden geleni yap, sonra sonucu gönül rahatlığıyla bekle.',
    },
    girisKancasi: {
      soru: 'Bir sınav için elinden gelen tüm gayretle çalıştın. Sonucu beklerken içini nasıl ferah tutarsın?',
      ipucu: 'Ektiğimiz bir tohumun büyümesi için sadece sulamak yeterli midir?',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 45,
        tip: 'dogru_yanlis',
        soruMetni: "Tevekkül etmek, hiçbir şey yapmadan sadece oturup Allah'tan yardım beklemektir.",
        dogruCevap: false,
        geriBildirimDogru: "Harika! Tevekkül, önce çalışıp sonra Allah'a dayanmaktır. Tembellik tevekkül değildir.",
        geriBildirimYanlis: "Yanlış! Önce elimizden geleni yapmalı (örneğin ders çalışmalı), sonra Allah'a güvenmeliyiz.",
      },
      {
        zamanDamgasi: 95,
        tip: 'coktan_secmeli',
        soruMetni: "Fidan hemen yaprak açmadığında Emir ve Ayşe'nin nasıl davranması gerekir?",
        secenekler: [
          { id: 'A', metin: 'Üzülüp fidanı sulamayı tamamen bırakmalılar.', dogruMu: false },
          { id: 'B', metin: "Ellerinden geleni yapmaya devam edip büyümesini Allah'tan beklemeliler.", dogruMu: true },
        ],
        geriBildirimDogru: "Harika! İşte tevekkül tam olarak budur: Sen çalış, sonucu Allah'a bırak.",
        geriBildirimYanlis: 'Hemen umutsuzluğa kapılmamalıyız. Üzerimize düşeni yaptıktan sonra beklemeyi bilmeliyiz.',
      },
      {
        zamanDamgasi: 135,
        tip: 'bilgi_karti',
        metin: "Peygamber Efendimiz (s.a.v), devesini bağlamadan 'Allah'a tevekkül ettim' diyen birine 'Önce deveni bağla, sonra tevekkül et' diyerek sorumluluğun önemini hatırlatmıştır.",
      },
    ],
    tefekkurSorulari: [
      "Hiç ders çalışmadan sınava giren bir öğrenci başarılı olmayı Allah'tan bekleyebilir mi?",
      'Tevekkül etmek, bizi neden gereksiz yere kaygılanmaktan ve stresten korur?',
    ],
    haftaninGorevi: {
      baslik: 'Tevekkül Görevi',
      aciklama: 'Bugün üzerine düşen bir sorumluluğu (ödevini yapmak veya odanı toplamak) en iyi şekilde bitir ve gerisi için içini ferah tut.',
    },
    kazanilanRozet: 'Tevekkül Yıldızı Rozeti',
  },

  11: {
    // Bağışlamak
    tema: 'Hataları Affetmek ve Hoşgörü',
    ogrenmeHedefleri: [
      'Affetmenin kalbi nasıl hafiflettiğini ve insanı özgürleştirdiğini anlayabileceksin.',
      'Kin tutmanın zararlı, affetmenin ise faydalı olduğunu fark edebileceksin.',
      'Arkadaşlarınla veya kardeşinle yaşadığın küçük sorunlarda affetmeyi uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Bağışlamak (Af)',
        anlam: 'Bize karşı yapılan bir hata veya kötülük karşısında ceza vermekten vazgeçmek, hakkını helal etmek.',
      },
      {
        kavram: 'Hoşgörü',
        anlam: 'İnsanların hatalarını ve eksiklerini anlayışla karşılamak.',
      },
    ],
    guzelSoz: {
      metin: 'Affetmek yiğitliktir.',
      kaynak: '— Yunus Emre',
      aciklama: 'Yunus Emre bu sözüyle affetmenin zayıflık değil, büyük bir yiğitlik olduğunu anlatıyor. Birini affettiğinde kalbini kin ve öfkeden arındırmış olursun. Affetmek hem seni hem karşındakini özgürleştirir.',
    },
    girisKancasi: {
      soru: 'Bir arkadaşın yanlışlıkla oyununu bozduğunda ona hemen kızar mısın, yoksa onu affeder misin?',
      ipucu: 'Kalbimizi tertemiz yapmanın sihirli bir yolu vardır: Affetmek.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 35,
        tip: 'coktan_secmeli',
        soruMetni: "Emir kedi yüzünden Ayşe'ye kızdığında, Ayşe kalbini nasıl temizledi?",
        secenekler: [
          { id: 'A', metin: 'Öfkesini yenip kardeşinin yanına gitti ve onu bağışladı.', dogruMu: true },
          { id: 'B', metin: "Emir'e çok küstü ve onunla oynamayı bıraktı.", dogruMu: false },
        ],
        geriBildirimDogru: 'Tebrikler! Kızdığımız zamanlarda affa sarılmak çok büyük bir erdemdir.',
        geriBildirimYanlis: 'Küs kalmak kalbi yorar. Affetmek ise ceza vermekten her zaman daha iyidir.',
      },
      {
        zamanDamgasi: 80,
        tip: 'bilgi_karti',
        metin: "Allah'ın isimlerinden biri 'El-Afüvv'dür, yani hataları çokça silen ve affeden demektir. Allah, kullarını affedenleri sever.",
      },
      {
        zamanDamgasi: 120,
        tip: 'dogru_yanlis',
        soruMetni: 'Bizi üzen insanları asla affetmemeliyiz, kin tutmak bizi daha güçlü yapar.',
        dogruCevap: false,
        geriBildirimDogru: 'Çok doğru! Kin tutmak kalbi karartır, affetmek ise insanı özgürleştirir.',
        geriBildirimYanlis: 'Yanlış. Kin tutmak insana zarar verir. Asıl güç, hata yapanı affedebilmektir.',
      },
    ],
    tefekkurSorulari: [
      'Birisini affetmek sana kendini nasıl hissettirir?',
      'Eğer kimse kimseyi affetmeseydi dünyada arkadaşlık diye bir şey kalır mıydı?',
    ],
    haftaninGorevi: {
      baslik: 'Af ve Barış Görevi',
      aciklama: 'Eğer kalbini kıran veya tartıştığın biri varsa, bugün ona bir adım at ve onu affettiğini hissettir.',
    },
    kazanilanRozet: 'Gönül Yapan Af Kahramanı',
  },

  12: {
    // Yumuşak Huyluluk ve Nezaket
    tema: 'Nazik Konuşmak ve Öfkeyi Yenmek',
    ogrenmeHedefleri: [
      'Nezaket ve yumuşak huyluluk kavramlarını anlayabilecek ve neden önemli olduklarını öğrenebileceksin.',
      'Sinirlendiğinde sakin kalmanın ve nazik konuşmanın yollarını fark edebileceksin.',
      'Günlük konuşmalarında "lütfen" ve "teşekkür ederim" gibi nezaket ifadelerini kullanmayı uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Nezaket',
        anlam: 'Başkalarına karşı kibar, ince düşünceli ve saygılı davranmak.',
      },
      {
        kavram: 'Hilim (Yumuşak Huyluluk)',
        anlam: 'Sinirlenecek durumlarda bile sakin kalabilmek, kaba davranmamak.',
      },
    ],
    guzelSoz: {
      metin: 'Tatlı dil yılanı deliğinden çıkarır.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize nazik ve tatlı konuşmanın gücünü anlatıyor. Sert ve kaba konuşarak elde edemeyeceğin şeyleri, nazik bir dil ile kolayca başarabilirsin. Tatlı dil her kapıyı açar.',
    },
    girisKancasi: {
      soru: 'Birisi okulda yanlışlıkla eşyalarını düşürse ona nasıl bir tepki verirsin?',
      ipucu: 'Tatlı dil ve nezaketin açamayacağı hiçbir kapı yoktur.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 40,
        tip: 'bilgi_karti',
        metin: 'Peygamber Efendimiz (s.a.v) her zaman güleryüzlü ve nazikti. Hiçbir zaman kötü söz söylemez, kırıcı davranmazdı.',
      },
      {
        zamanDamgasi: 85,
        tip: 'coktan_secmeli',
        soruMetni: "Okulda bir arkadaşı Ayşe'ye çarpıp kitaplarını düşürdüğünde, Ayşe ne yaptı?",
        secenekler: [
          { id: 'A', metin: 'Hemen sinirlenip arkadaşına bağırdı.', dogruMu: false },
          { id: 'B', metin: 'Derin bir nefes aldı, gülümsedi ve nezaket gösterdi.', dogruMu: true },
        ],
        geriBildirimDogru: 'Harika! Yumuşak huylu olmak kavgaları başlamadan bitirir.',
        geriBildirimYanlis: 'Öfkeyle kalkan zararla oturur. Bize çarpan birine nezaketle yaklaşmalıyız.',
      },
      {
        zamanDamgasi: 130,
        tip: 'dogru_yanlis',
        soruMetni: 'Sadece sevdiğimiz insanlara karşı nazik olmalıyız, tanımadıklarımıza kaba davranabiliriz.',
        dogruCevap: false,
        geriBildirimDogru: 'Mükemmel! Müslüman herkese karşı nezaketlidir.',
        geriBildirimYanlis: 'Nezaket herkese gösterilir. Tatlı dil yılanı deliğinden çıkarır.',
      },
    ],
    tefekkurSorulari: [
      'Kaba konuşan biriyle aynı ortamda olmak seni nasıl etkiler?',
      "'Lütfen' ve 'Teşekkür ederim' kelimeleri insanları birbirine nasıl yaklaştırır?",
    ],
    haftaninGorevi: {
      baslik: 'Nezaket Elçisi Görevi',
      aciklama: "Bugün ailenle veya arkadaşlarınla konuşurken 'Lütfen' ve 'Teşekkür ederim' kelimelerini en az 5 defa kullan.",
    },
    kazanilanRozet: 'Nezaket Elçisi Rozeti',
  },

  13: {
    // Güvenilirlik
    tema: 'Dürüst Olmak ve Emaneti Korumak',
    ogrenmeHedefleri: [
      'Güvenilir bir insan olmanın ne anlama geldiğini anlayabileceksin.',
      'Sözünde durmanın ve dürüst olmanın arkadaşlıklardaki önemini fark edebileceksin.',
      'Hata yaptığında bunu gizlemek yerine cesurca itiraf etmeyi uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Emin (Güvenilir) Olmak',
        anlam: 'İnsanların sözüne ve davranışlarına inandığı, ihanet etmeyen kimse olmak.',
      },
      {
        kavram: 'Sözünde Durmak',
        anlam: 'Verilen bir vaadi ne pahasına olursa olsun yerine getirmek.',
      },
    ],
    guzelSoz: {
      metin: 'Söz gümüşse sükut altındır. Ama verilen söz senettir.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize güvenilir olmanın temelinin sözünde durmak olduğunu anlatıyor. Bir söz verdiğimizde o söz bir senet gibidir, mutlaka yerine getirilmelidir. Doğru söyleyen ve sözünde duran insan herkesin güvenini kazanır.',
    },
    girisKancasi: {
      soru: 'Yanlışlıkla başkasına ait bir eşyaya zarar versen bunu saklar mısın, yoksa dürüstçe söyler misin?',
      ipucu: 'Tehlikede bile olsan, doğruluk her zaman en güvenli sığınaktır.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 40,
        tip: 'coktan_secmeli',
        soruMetni: "Zarftaki kağıt yanlışlıkla yırtılınca Emir ve Ayşe'nin en doğru kararı ne olmalıydı?",
        secenekler: [
          { id: 'A', metin: 'Yırtılan kağıdı saklayıp dedelerine hiçbir şey söylememek.', dogruMu: false },
          { id: 'B', metin: 'Ne olursa olsun dürüst davranıp dedelerine gerçeği anlatmak.', dogruMu: true },
        ],
        geriBildirimDogru: 'Çok doğru! Güvenilir olmak, hatamızı kabul edip dürüst davranmayı gerektirir.',
        geriBildirimYanlis: 'Hatamızı saklamak bizi güvenilmez yapar. Her zaman dürüst olmalıyız.',
      },
      {
        zamanDamgasi: 85,
        tip: 'bilgi_karti',
        metin: "Peygamber Efendimiz Hz. Muhammed (s.a.v) peygamber olmadan önce bile o kadar dürüsttü ki, herkes ona 'Muhammed'ül Emin' (Güvenilir Muhammed) derdi.",
      },
      {
        zamanDamgasi: 125,
        tip: 'dogru_yanlis',
        soruMetni: 'Hatamızı dürüstçe söylersek ailemiz veya büyüklerimiz bize kesinlikle kötü davranır.',
        dogruCevap: false,
        geriBildirimDogru: 'Harika! Doğruyu söyleyen kişi her zaman takdir edilir ve affedilir.',
        geriBildirimYanlis: 'Büyüklerimiz dürüstlüğümüzü görürse kızmak yerine doğruluğumuzu takdir ederler.',
      },
    ],
    tefekkurSorulari: [
      'Güvenilen bir insan olmak neden zor kazanılır ama kolay kaybedilir?',
      'Bir arkadaşının sırrını başkasına anlattığında arkadaşının sana olan güveni nasıl etkilenir?',
    ],
    haftaninGorevi: {
      baslik: 'Emanet ve Güven Görevi',
      aciklama: 'Bugün ailene karşı bir hata yaparsan bunu kesinlikle gizleme, cesurca ve dürüstçe itiraf et.',
    },
    kazanilanRozet: 'Güvenilir Kalp Rozeti',
  },

  14: {
    // Öfkeye Hâkim Olmak
    tema: 'Sakin Kalmak ve Sinire Yenilmemek',
    ogrenmeHedefleri: [
      'Öfke duygusunu tanıyabilecek ve onu kontrol etmenin yollarını öğrenebileceksin.',
      'Sinirlendiğinde hemen tepki vermenin zararlarını fark edebileceksin.',
      'Öfkelendiğinde derin nefes almak ve sakinleşmek gibi yöntemleri uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Öfke',
        anlam: 'Hoşa gitmeyen durumlarda hissedilen güçlü sinirlenme duygusu.',
      },
      {
        kavram: 'Nefsine Hakim Olmak',
        anlam: 'İçinden gelen kötü hisleri ve siniri kontrol altında tutabilmek.',
      },
    ],
    guzelSoz: {
      metin: 'Öfke ile kalkan zararla oturur.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize öfkeyle hareket etmenin her zaman zararlı sonuçlar doğurduğunu öğretiyor. Sinirli anlarımızda verdiğimiz kararlar genellikle yanlış olur. Asıl güçlü insan sinirlendiğinde kendini tutabilen insandır.',
    },
    girisKancasi: {
      soru: 'Oyun oynarken işler istediğin gibi gitmediğinde sinirlenip oyunu bozar mısın, yoksa sakinleşmeyi mi denersin?',
      ipucu: 'Öfke küçük bir alev gibidir, onu sadece sabır suyu söndürebilir.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 35,
        tip: 'dogru_yanlis',
        soruMetni: 'Sinirlendiğimizde eşyalara vurmak veya bağırmak öfkemizi geçirmenin en iyi yoludur.',
        dogruCevap: false,
        geriBildirimDogru: 'Tebrikler. Eşyalara zarar vermek öfkeyi büyütür, en iyisi sakinleşmektir.',
        geriBildirimYanlis: 'Bu yanlış bir davranıştır. Öfkeyle kalkan zararla oturur.',
      },
      {
        zamanDamgasi: 80,
        tip: 'coktan_secmeli',
        soruMetni: "Top yanlışlıkla Emir'in yüzüne çarpınca Emir'in hissettiği o kızgınlık neye benziyordu?",
        secenekler: [
          { id: 'A', metin: 'Etrafına zarar veren küçük bir ateşe.', dogruMu: true },
          { id: 'B', metin: 'Mutluluk ve heyecan veren bir duyguya.', dogruMu: false },
        ],
        geriBildirimDogru: 'Tebrikler. Öfke bir ateş gibidir, bizi ve çevremizi yakmadan kontrol etmeliyiz.',
        geriBildirimYanlis: 'Yüzü kızaran ve topu yere fırlatan biri mutluluk değil, kontrol edilmesi gereken bir öfke hissediyordur.',
      },
      {
        zamanDamgasi: 125,
        tip: 'bilgi_karti',
        metin: "Peygamber Efendimiz (s.a.v) öfkelenen birine 'Ayaktaysan otur, oturuyorsan uzan veya git abdest al' tavsiyesinde bulunmuştur.",
      },
    ],
    tefekkurSorulari: [
      "Seni çok sinirlendiren bir anda hemen cevap vermek yerine içinden 10'a kadar saymak sence neden işe yarar?",
      'Öfkeliyken söylenen sözler neden daha sonra pişmanlık yaratır?',
    ],
    haftaninGorevi: {
      baslik: 'Öfke Kontrol Görevi',
      aciklama: "Bugün seni sinirlendirecek bir şey olursa hemen tepki verme. İçinden 10'a kadar say, derin nefes al ve sakinleşmeyi bekle.",
    },
    kazanilanRozet: 'Sakinlik ve Huzur Kahramanı Rozeti',
  },

  15: {
    // Kardeşlik
    tema: 'Dostluk ve Paylaşım',
    ogrenmeHedefleri: [
      'Kardeşlik kavramını anlayabilecek ve din kardeşliğinin kan bağından farklı olduğunu öğrenebileceksin.',
      'Paylaşmanın dostluğu nasıl güçlendirdiğini fark edebileceksin.',
      'Sahip olduğun güzellikleri arkadaşlarınla ve kardeşlerinle paylaşmayı uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Kardeşlik',
        anlam: 'Aynı anne babadan olanların veya inanç bağlarıyla birbirine sıkıca bağlı olan müminlerin dostluğu.',
      },
      {
        kavram: 'Paylaşmak',
        anlam: 'Sahip olduğu güzellikleri, eşyaları veya imkanları ihtiyacı olanlarla bölüşmek.',
      },
    ],
    guzelSoz: {
      metin: 'Gül bahçesine giren gül kokar, kömürcüye giren is kokar.',
      kaynak: '— Mevlana',
      aciklama: 'Mevlana bu sözüyle birbirimizi nasıl etkilediğimizi anlatıyor. İyi insanlarla bir arada olan iyileşir, kötülerle bir arada olan kötüleşir. Paylaşmak ve birbirine destek olmak gerçek kardeşliğin temelidir.',
    },
    girisKancasi: {
      soru: 'Okulda kalemini veya silgisini evde unutmuş bir arkadaşını görsen ne yaparsın?',
      ipucu: 'Gerçek kardeşlik ve dostluk bazen sadece tek bir kalemi paylaşmakla başlar.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 40,
        tip: 'bilgi_karti',
        metin: 'İslam dininde Müslümanlar bir binanın tuğlaları gibi birbirine kenetlenmiş kardeşler olarak tarif edilir.',
      },
      {
        zamanDamgasi: 85,
        tip: 'coktan_secmeli',
        soruMetni: 'Ayşe okulda kalemini unuttuğunda arkadaşı Zeynep ona nasıl destek oldu?',
        secenekler: [
          { id: 'A', metin: 'Kendi kalemlerinden en güzelini Ayşe ile paylaştı.', dogruMu: true },
          { id: 'B', metin: "Ayşe'ye başka birinden kalem istemesini söyledi.", dogruMu: false },
        ],
        geriBildirimDogru: 'Çok güzel! Paylaşmak, arkadaşlığı gerçek bir kardeşliğe dönüştürür.',
        geriBildirimYanlis: 'Dostlarımız zor durumda kaldığında elimizdekini onlarla paylaşmaktan çekinmemeliyiz.',
      },
      {
        zamanDamgasi: 130,
        tip: 'dogru_yanlis',
        soruMetni: 'Sadece kan bağımız olan öz kardeşlerimizle eşyalarımızı paylaşmalıyız.',
        dogruCevap: false,
        geriBildirimDogru: 'Doğru bildin. Din kardeşlerimizle ve tüm insanlarla da paylaşmayı bilmeliyiz.',
        geriBildirimYanlis: 'Hayır, inancımız gereği tüm dostlarımız ve arkadaşlarımız bizim kardeşimiz gibidir.',
      },
    ],
    tefekkurSorulari: [
      'Gerçek kardeşlik sence sadece eşya paylaşmak mıdır, yoksa duyguları da paylaşmak mıdır?',
      'Kardeşine veya arkadaşına olan sevgini eşya vermeden nasıl gösterebilirsin?',
    ],
    haftaninGorevi: {
      baslik: 'Paylaşım Görevi',
      aciklama: 'Bugün evde veya okulda kendi sevdiğin bir eşyayı, yiyeceği veya güzel bir bilgiyi bir arkadaşınla, kardeşinle paylaş.',
    },
    kazanilanRozet: 'Gerçek Kardeşlik Madalyası',
  },

  16: {
    // Kıskançlık
    tema: 'Kıskançlık (Haset) ve Kötülüğün Sonu',
    ogrenmeHedefleri: [
      'Haset (kıskançlık) kavramını anlayabilecek ve bunun kalbimize nasıl zarar verdiğini öğrenebileceksin.',
      'Başkalarının başarısına sevinmenin kıskançlıktan çok daha güzel olduğunu fark edebileceksin.',
      'Arkadaşlarının güzel şeylerini gördüğünde kıskanmak yerine onları tebrik etmeyi uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Haset (Kıskançlık)',
        anlam: 'Başkasında olan bir güzelliği veya başarıyı çekememek, onun elinden gitmesini istemek.',
      },
      {
        kavram: 'Kötü Niyet',
        anlam: 'İnsanlara zarar vermek veya onları zor duruma düşürmek için içten içe plan yapmak.',
      },
    ],
    guzelSoz: {
      metin: 'Kıskançlık insanı yer bitirir, nasıl ki güve elbiseyi yer bitirir.',
      kaynak: '— Hz. Ali (Hikmetli Söz)',
      aciklama: 'Hz. Ali bu sözüyle kıskançlığın ne kadar tehlikeli olduğunu anlatıyor. Nasıl güve elbiseyi yavaş yavaş yok ederse, kıskançlık da insanın içini yavaş yavaş çürütür. Başkalarının başarısına sevinmek kalbimizi temiz tutar.',
    },
    girisKancasi: {
      soru: "Bir arkadaşın çok güzel bir oyuncak veya başarı kazandığında onun adına sevinir misin, yoksa 'keşke benim olsa' diye üzülür müsün?",
      ipucu: 'Başkasının mutluluğuna sevinmek kalbimizi ferahlatır, kıskançlık ise bir ateş gibi içimizi yakar.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 65,
        tip: 'bilgi_karti',
        metin: 'Kıskanç vezir, padişahın iyi veziri daha çok sevdiğini görünce kalbini haset hastalığına kaptırmış ve ona oyun oynamaya karar vermiştir.',
      },
      {
        zamanDamgasi: 150,
        tip: 'dogru_yanlis',
        soruMetni: "Kıskanç vezir, iyi vezire sarımsaklı mantı yedirip padişahın huzurunda ağzını kapatmasını söyleyerek ona iyilik yapmıştır.",
        dogruCevap: false,
        geriBildirimDogru: 'Çok dikkatlisin! Bu bir iyilik değil, iyi veziri padişahın gözünden düşürmek için kurulan sinsi bir tuzaktı.',
        geriBildirimYanlis: 'Dikkatli izlemedin sanırım. Bu, padişahın iyi vezire kızması için kurulmuş bir plandı.',
      },
      {
        zamanDamgasi: 210,
        tip: 'coktan_secmeli',
        soruMetni: 'Kıskanç vezirin başkasına kurduğu tuzağın sonunda kendi başına ne gelmiştir?',
        secenekler: [
          { id: 'A', metin: 'Padişah onu ödüllendirmiştir.', dogruMu: false },
          { id: 'B', metin: 'Kendi kazdığı kuyuya kendisi düşmüş ve ceza almıştır.', dogruMu: true },
        ],
        geriBildirimDogru: 'Harika! Başkasına kötülük düşünen sonunda kendi kötülüğüne uğrar.',
        geriBildirimYanlis: 'Haset eden her zaman kaybeder, cezayı alan kıskanç vezir oldu.',
      },
    ],
    tefekkurSorulari: [
      'Arkadaşının başarılı olduğu bir konuda onu kıskanmak yerine tebrik etmek sana ne kazandırır?',
      "Dedemizin anlattığı 'Kazdığın kuyuya kendin düşersin' atasözü sence ne anlama geliyor?",
    ],
    haftaninGorevi: {
      baslik: 'Mutluluğu Paylaşma Görevi',
      aciklama: 'Bugün çevrende başarılı olan veya güzel bir şey yapan bir arkadaşını içtenlikle ve kıskanmadan tebrik et.',
    },
    kazanilanRozet: 'Temiz Kalp Rozeti',
  },

  17: {
    // Millî ve Dinî Değerler
    tema: 'Vatan Sevgisi, Şehitlik ve Fedakarlık',
    ogrenmeHedefleri: [
      'Vatan sevgisinin ve fedakarlığın ne demek olduğunu anlayabileceksin.',
      'Şehitlerimizin vatanımız için yaptığı büyük fedakarlıkları fark edebileceksin.',
      'Bugün bir öğrenci olarak vatanına nasıl hizmet edebileceğini kavrayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Vatan Sevgisi',
        anlam: 'Üzerinde yaşadığımız, atalarımızın emaneti olan yurdumuzu çok sevmek ve onu korumak.',
      },
      {
        kavram: 'Fedakarlık',
        anlam: 'Daha önemli bir amaç için (örneğin vatan için) kendi canından, malından veya sevdiklerinden vazgeçebilmek.',
      },
    ],
    guzelSoz: {
      metin: 'Vatan sevgisi her insanın en kutsal duygusudur.',
      kaynak: '— Mustafa Kemal Atatürk',
      aciklama: 'Atatürk bu sözüyle vatan sevgisinin her insanın kalbinde taşıması gereken en kutsal duygu olduğunu hatırlatıyor. Vatanımız, üzerinde yaşadığımız, ailelerimizle birlikte büyüdüğümüz ve özgürce nefes aldığımız kutsal bir emanettir.',
    },
    girisKancasi: {
      soru: 'Sahip olduğun en değerli şeyi başkalarının hayatını kurtarmak için feda edebilir miydin?',
      ipucu: "Çanakkale'de dedelerimiz vatanımız için en sevdiklerinden, hatta kendi canlarından bile vazgeçtiler.",
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 60,
        tip: 'bilgi_karti',
        metin: "Çanakkale Savaşı'nda doktorların elinde yeterli ilaç (morfin) yoktu. Bu yüzden ilacı sadece yaşama ihtimali olan askerlere vererek hayat kurtarmaya çalışıyorlardı.",
      },
      {
        zamanDamgasi: 135,
        tip: 'dogru_yanlis',
        soruMetni: 'Doktor Tarık Nusret Bey, yaralı olarak getirilen kendi oğlunu görünce elindeki son ilacı hemen ona yapmıştır.',
        dogruCevap: false,
        geriBildirimDogru: "Doğru bildin. Oğlu ağır yaralı olduğu ve yaşama ihtimali kalmadığı için o ilacı kurtulabilecek başka bir Mehmetçiğe saklamıştır. Bu devasa bir fedakarlıktır.",
        geriBildirimYanlis: 'Hayır. Oğlu ağır yaralı olduğu için ilacı ona yapmamış, o ilacı yaşama şansı olan başka bir askere saklamıştır.',
      },
      {
        zamanDamgasi: 205,
        tip: 'coktan_secmeli',
        soruMetni: "Doktor Tarık Nusret Bey'in oğluna ilaç vermemesi bize onun hakkında neyi gösterir?",
        secenekler: [
          { id: 'A', metin: 'Vatanını ve görevini kendi canından, evladından bile önde tuttuğunu.', dogruMu: true },
          { id: 'B', metin: 'Oğlunu sevmediğini.', dogruMu: false },
        ],
        geriBildirimDogru: "Harika. İşte Çanakkale Ruhu tam olarak budur: Vatan ve millet sevgisinin her şeyin üstünde olması.",
        geriBildirimYanlis: 'Bir babanın evladını sevmemesi mümkün değildir. O sadece vatanı için en acı fedakarlığı seçmiştir.',
      },
    ],
    tefekkurSorulari: [
      'Vatanımız için bugün bizim yapabileceğimiz en büyük fedakarlıklar ve görevler nelerdir?',
      "Çanakkale'deki askerlerimizin gösterdiği bu cesaret bize derslerimizde ve hayatımızda nasıl ilham vermeli?",
    ],
    haftaninGorevi: {
      baslik: 'Vatan Bekçisi Görevi',
      aciklama: 'Bugün vatanımız ve bayrağımız için içinden güzel bir dua et ve İstiklal Marşımızı içinden hissederek oku.',
    },
    kazanilanRozet: 'Çanakkale Ruhu Rozeti',
  },

  18: {
    // Namuslu Olmak
    tema: 'Haya, İffet ve Özel Hayata Saygı',
    ogrenmeHedefleri: [
      'Haya ve iffet kavramlarını anlayabilecek ve bunların sadece giyimle sınırlı olmadığını öğrenebileceksin.',
      'Gözümüzü, dilimizi ve kalbimizi kötüden korumanın önemini fark edebileceksin.',
      'Yalnızken bile edepli davranmanın bir alışkanlık olması gerektiğini kavrayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Haya (Utanma Duygusu)',
        anlam: 'Kötü ve çirkin işleri yapmaktan çekinmek, ahlaklı ve edepli olmak.',
      },
      {
        kavram: 'İffet',
        anlam: 'Namuslu olmak, bedeni ve gözü haramdan, kötü sözden ve davranıştan korumaktır.',
      },
    ],
    guzelSoz: {
      metin: 'Utanmak insanın süsüdür.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize utanma duygusunun (hayanın) insanı güzelleştiren bir süs gibi olduğunu anlatıyor. Edepli ve hayalı insan kötü şeylerden uzak durur. Yalnızken bile doğru davranan insan gerçekten olgun bir insandır.',
    },
    girisKancasi: {
      soru: 'Evde kendi odanda yalnızken bile neden davranışlarına ve giyimine dikkat etmelisin?',
      ipucu: 'Haya (edep), sadece başkaları varken değil, yalnızken de sahip olmamız gereken bir güzelliktir.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 35,
        tip: 'dogru_yanlis',
        soruMetni: "Ayşe'nin odasının penceresi açıkken dışarıdan kimse geçmiyorsa perdenin açık kalmasında hiçbir sakınca yoktur.",
        dogruCevap: false,
        geriBildirimDogru: 'Çok doğru! Dışarıdan biri geçmese bile, özel alanımızı korumak için perdelerimizi kapatmalıyız. Bu iffetin gereğidir.',
        geriBildirimYanlis: 'Hatalı cevap. Bizi kimsenin görmeyeceğini düşünsek bile özel hayatımızı ve mahremiyetimizi korumak için önlem almalıyız.',
      },
      {
        zamanDamgasi: 60,
        tip: 'bilgi_karti',
        metin: 'Dedemiz odaya girdiğinde sessizce ve gülümseyerek perdeyi kapattı. Çünkü haya insanı tıpkı bir perde gibi dışarının kötülüklerinden korur.',
      },
      {
        zamanDamgasi: 110,
        tip: 'coktan_secmeli',
        soruMetni: "Dedemizin anlattıklarına göre 'İffet ve Haya' sadece giyimle mi ilgilidir?",
        secenekler: [
          { id: 'A', metin: 'Evet, sadece kıyafetlerimizle ilgilidir.', dogruMu: false },
          { id: 'B', metin: 'Hayır. Gözümüzü kötüye bakmaktan, dilimizi kötü sözden korumak da iffettir.', dogruMu: true },
        ],
        geriBildirimDogru: 'Harika! Gözümüzün, dilimizin ve kalbimizin iffetini de korumalıyız.',
        geriBildirimYanlis: 'İffet sadece dış görünüş değil; bakışlarımızı, sözlerimizi ve düşüncelerimizi de temiz tutmaktır.',
      },
    ],
    tefekkurSorulari: [
      "İnternette veya televizyonda gördüğümüz kötü ve çirkin görüntülere bakmamak 'gözün iffeti' midir?",
      'Haya duygusu insanı hata yapmaktan nasıl alıkoyar?',
    ],
    haftaninGorevi: {
      baslik: 'Haya ve İffet Görevi',
      aciklama: 'Bugün hiç kimsenin seni duymadığı anlarda bile dilini kötü sözden koru, sadece güzel ve edepli kelimeler kullan.',
    },
    kazanilanRozet: 'Edep Timsali Rozeti',
  },

  19: {
    // Sevgi
    tema: 'Yaratılanı Sevmek ve Merhamet',
    ogrenmeHedefleri: [
      'Sevgi ve merhamet kavramlarını anlayabilecek ve tüm canlılara şefkat göstermenin önemini öğrenebileceksin.',
      'Kırılanı tamir etmenin ve hata yapana şefkatle yaklaşmanın gerçek sevgi olduğunu fark edebileceksin.',
      'Hayvanlara, doğaya ve çevrendeki insanlara sevgiyle davranmayı uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Sevgi',
        anlam: "Allah'ın yarattığı her şeye (insanlara, hayvanlara, doğaya) karşı içimizde hissettiğimiz sıcaklık ve koruma isteği.",
      },
      {
        kavram: 'Merhamet',
        anlam: 'Bir canlının acı çekmesine veya zarar görmesine üzülüp ona şefkatle yardım etmek.',
      },
    ],
    guzelSoz: {
      metin: 'Yaratılanı severiz Yaratandan ötürü.',
      kaynak: '— Yunus Emre',
      aciklama: 'Yunus Emre bu sözüyle tüm canlılara sevgi ve merhamet göstermemiz gerektiğini anlatıyor. İnsanlara, hayvanlara ve doğaya sevgiyle yaklaşan insan merhametin en güzel örneğini verir. Sevgi ve merhamet gösterene, sevgi ve merhamet gösterilir.',
    },
    girisKancasi: {
      soru: 'Çok sevdiğin bir çiçeğin kazara kırıldığını görsen onu çöpe mi atarsın, yoksa toprağa dikip iyileştirmeye mi çalışırsın?',
      ipucu: 'Gerçek sevgi, kırılanı tamir etmek ve hataları şefkatle sarmaktır.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 35,
        tip: 'bilgi_karti',
        metin: "Yunus Emre'nin çok güzel bir sözü vardır: 'Yaratılanı severim, Yaradan'dan ötürü.' Biz her şeyi Allah yarattığı için sevgiyle kucaklarız.",
      },
      {
        zamanDamgasi: 80,
        tip: 'dogru_yanlis',
        soruMetni: "Emir bahçede koşarken kazara papatyalara basıp onları ezdiğinde, Ayşe ona çok kızıp bağırmalıydı.",
        dogruCevap: false,
        geriBildirimDogru: 'Harika! Ayşe üzüldü ama kardeşine kızmak yerine kırılanı tamir etmeyi seçti.',
        geriBildirimYanlis: 'Hata yapanlara sevgiyle yaklaşmalıyız, bağırarak veya öfkelenerek değil.',
      },
      {
        zamanDamgasi: 130,
        tip: 'coktan_secmeli',
        soruMetni: 'Dedemize göre gerçek sevgi ne demektir?',
        secenekler: [
          { id: 'A', metin: 'Sadece işler yolundayken ve her şey güzelken birini sevmektir.', dogruMu: false },
          { id: 'B', metin: 'Kırılanı tamir etmek, kızmamak ve hata yapıldığında affedebilmektir.', dogruMu: true },
        ],
        geriBildirimDogru: 'Çok doğru! Sevgi zor zamanlarda, şefkat göstermekle belli olur.',
        geriBildirimYanlis: 'Sevgi sadece iyi günlerde değil, bir hata yapıldığında şefkat göstermekle kanıtlanır.',
      },
    ],
    tefekkurSorulari: [
      "Evdeki hayvanlara veya sokaktaki kedilere sevgi göstermek neden Allah'ı memnun eder?",
      "Kardeşin veya arkadaşın senin bir eşyanı bozduğunda 'sevgi' dilini nasıl kullanırsın?",
    ],
    haftaninGorevi: {
      baslik: 'Sevgi Tohumu Görevi',
      aciklama: 'Bugün evdeki bir çiçeğe su ver veya sokaktaki bir hayvana yiyecek/su koyarak onlara sevgini göster.',
    },
    kazanilanRozet: 'Sevgi ve Şefkat Rozeti',
  },

  20: {
    // Ahde Vefa
    tema: 'Verilen Sözü Tutmak',
    ogrenmeHedefleri: [
      'Ahde vefa kavramını anlayabilecek ve verilen sözün ne kadar önemli olduğunu öğrenebileceksin.',
      'Sözünden dönen insanlara güvenin nasıl azaldığını fark edebileceksin.',
      'Verdiğin küçük büyük her sözü tutmayı bir alışkanlık haline getirmeyi uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Ahde Vefa',
        anlam: 'Verilen sözde durmak, yapılan anlaşmalara sadık kalmak ve güveni boşa çıkarmamak.',
      },
      {
        kavram: 'Sadakat',
        anlam: 'Dostlara, aileye ve verilen sözlere karşı sağlam ve dürüst bir bağ ile bağlı olmak.',
      },
    ],
    guzelSoz: {
      metin: 'Sözünü tutmayan insanın ne haysiyeti kalır ne dostluğu.',
      kaynak: '— Hz. Ali (Hikmetli Söz)',
      aciklama: 'Hz. Ali bu sözüyle verilen sözün ne kadar önemli olduğunu anlatıyor. Bir söz verdiğimizde bu bir sorumluluktur. Sözünden dönen insana kimse güvenemez ve dostlukları bozulur. Bu yüzden tutamayacağımız sözleri vermemeli, verdiğimiz sözleri ise mutlaka tutmalıyız.',
    },
    girisKancasi: {
      soru: "Bir arkadaşına 'Yarın seninle oyun oynayacağım' diye söz verdikten sonra başka eğlenceli bir iş çıksa ne yaparsın?",
      ipucu: 'İnsanı en güvenilir yapan şey, sözünün eri olmasıdır.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 30,
        tip: 'bilgi_karti',
        metin: "Münafığın (ikiyüzlünün) özelliklerinden biri de 'söz verdiğinde sözünde durmamasıdır'. Müslüman ise verdiği sözü ne pahasına olursa olsun tutar.",
      },
      {
        zamanDamgasi: 85,
        tip: 'dogru_yanlis',
        soruMetni: "Dedeleri hastaneden döndükten sonra haftalar geçmesine rağmen Ayşe ve Emir ona kütüphaneye gitme sözlerini unutmuşlardı.",
        dogruCevap: false,
        geriBildirimDogru: 'Doğru bildin! Aradan haftalar geçse de sözlerini unutmadılar ve dedeleri iyileşince sözlerini tuttular.',
        geriBildirimYanlis: 'Hayır, onlar verdikleri sözü asla unutmadılar. Ahde vefa gösterdiler.',
      },
      {
        zamanDamgasi: 130,
        tip: 'coktan_secmeli',
        soruMetni: "Dedemize göre 'Ahde Vefa' ne demektir?",
        secenekler: [
          { id: 'A', metin: 'Sadece işimize geldiği zamanlarda verdiğimiz sözleri tutmaktır.', dogruMu: false },
          { id: 'B', metin: 'Verilen sözü unutmamak ve insanı insan yapan en önemli değerlerden biri olmaktır.', dogruMu: true },
        ],
        geriBildirimDogru: 'Mükemmel! Sözümüzü tutmak bizi güvenilir ve dürüst bir insan yapar.',
        geriBildirimYanlis: 'Sözümüzü şartlar ne olursa olsun, işimize gelmese bile tutmalıyız.',
      },
    ],
    tefekkurSorulari: [
      'Birisi sana verdiği sözü tutmadığında ona olan güvenin nasıl etkilenir?',
      'Sözümüzü tutmanın Allah katında neden bu kadar önemli bir sorumluluk olduğunu düşünüyorsun?',
    ],
    haftaninGorevi: {
      baslik: 'Sözünün Eri Görevi',
      aciklama: 'Bugün annene, babana veya kardeşine küçük bir söz ver (örneğin odamı toplayacağım) ve o sözü kesinlikle eksiksiz yerine getir.',
    },
    kazanilanRozet: 'Ahde Vefa Madalyası',
  },

  21: {
    // Arkadaşlık ve Dostluk
    tema: 'Gerçek Dostluk ve Paylaşım',
    ogrenmeHedefleri: [
      'Gerçek dostluğun ne demek olduğunu ve iyi arkadaş seçmenin önemini anlayabileceksin.',
      'Dostluğun sadece iyi günlerde değil, zor günlerde de sürmesi gerektiğini fark edebileceksin.',
      'Arkadaşlarınla paylaşarak ve onlara destek olarak dostluğunu güçlendirmeyi uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Dostluk',
        anlam: 'İnsanlar arasında sevgi, güven, saygı ve yardımlaşmaya dayanan güçlü bağ.',
      },
      {
        kavram: 'Paylaşmak',
        anlam: 'Sahip olduğumuz maddi veya manevi imkanları ihtiyacı olan kardeşlerimizle bölüşmek.',
      },
    ],
    guzelSoz: {
      metin: 'Bana arkadaşını söyle, sana kim olduğunu söyleyeyim.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü arkadaşlarımızın bizi çok etkilediğini söylüyor. İyi arkadaşlarla vakit geçiren insan iyileşir, kötü arkadaşlarla vakit geçiren kötüleşir. Bu yüzden arkadaşlarımızı dikkatli seçmeliyiz.',
    },
    girisKancasi: {
      soru: 'Bir arkadaşının okulda silgisi veya kalemi kaybolsa kendi kalemini onunla paylaşır mısın?',
      ipucu: 'Bazen gerçek dostluk, küçücük bir boya kalemini paylaşmakla başlar.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 35,
        tip: 'bilgi_karti',
        metin: 'Peygamber Efendimiz (s.a.v) ve Hz. Ebubekir arasındaki bağ, tarihteki en güzel dostluk örneğidir. Zor zamanlarda hep birbirlerine destek olmuşlardır.',
      },
      {
        zamanDamgasi: 90,
        tip: 'coktan_secmeli',
        soruMetni: 'Ayşe okulda resim yaparken boyası olmadığında arkadaşı Fatma nasıl bir dostluk gösterdi?',
        secenekler: [
          { id: 'A', metin: "Kendi boyalarını Ayşe'ye uzattı ve beraber kullandılar.", dogruMu: true },
          { id: 'B', metin: "Ayşe'nin boyası olmadığı için onunla alay etti.", dogruMu: false },
        ],
        geriBildirimDogru: 'Harika! Paylaşmak dostluğu güçlendiren en güzel eylemdir.',
        geriBildirimYanlis: 'Dostlar birbirinin eksiğini tamamlar, alay etmezler.',
      },
      {
        zamanDamgasi: 130,
        tip: 'dogru_yanlis',
        soruMetni: "Gerçek dostluk sadece oyun oynarken beraber olmak demek değildir; zor durumlarda, top tellere sıkıştığında bile yardımlaşmaktır.",
        dogruCevap: true,
        geriBildirimDogru: "Kesinlikle! Emir'in arkadaşı onu kaldırıp topu almasına yardım ederek gerçek dostluğunu gösterdi.",
        geriBildirimYanlis: 'Yanlış düşündün. Dostluk iyi günde de kötü günde de beraber yardımlaşmaktır.',
      },
    ],
    tefekkurSorulari: [
      'Arkadaş seçerken onun hangi güzel huylara sahip olmasına dikkat etmeliyiz?',
      'Paylaşmayı bilen bir sınıf ortamında herkes kendini nasıl hisseder?',
    ],
    haftaninGorevi: {
      baslik: 'Dostluk Eli Görevi',
      aciklama: 'Okulda veya evde bir eşyanı sevdiğin bir arkadaşınla/kardeşinle paylaş ve onun işini kolaylaştır.',
    },
    kazanilanRozet: 'Gerçek Dost Rozeti',
  },

  22: {
    // Çevre Temizliği
    tema: 'Doğayı Korumak ve Temizlik',
    ogrenmeHedefleri: [
      'Çevre bilincinin ne demek olduğunu ve doğanın bize bir emanet olduğunu anlayabileceksin.',
      'Çöp atmanın ve doğaya zarar vermenin canlıları nasıl tehlikeye attığını fark edebileceksin.',
      'Çevreni temiz tutmayı ve doğayı korumayı günlük hayatında uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Çevre Bilinci',
        anlam: "Allah'ın bize emanet ettiği doğayı, ormanları ve sokakları kirletmemek, temiz tutmak.",
      },
      {
        kavram: 'Tahribat',
        anlam: 'Çevreye, eşyalara veya canlılara zarar vermek, onları bozmak.',
      },
    ],
    guzelSoz: {
      metin: 'Temizlik imandandır.',
      kaynak: '— Hadîs-i şerîf',
      aciklama: 'Bu hadîs-i şerîf temizliğin ne kadar önemli olduğunu hatırlatıyor. Temizlik sadece bedenimizi yıkamak değil, çevremizi, odamızı ve doğayı da temiz tutmaktır. Çevresini temiz tutan insan medeni bir insandır.',
    },
    girisKancasi: {
      soru: 'Sokakta yürürken yerde bir çöp veya cam şişe gördüğünde onu görmezden mi gelirsin, yoksa alıp çöpe mi atarsın?',
      ipucu: 'Dünya hepimizin evidir ve evimizi temiz tutmak en büyük görevlerimizdendir.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 35,
        tip: 'bilgi_karti',
        metin: 'İslam dininde yolda insanlara veya hayvanlara zarar verebilecek bir taşı, dikeni veya çöpü kenara kaldırmak sadaka (iyilik) sevabı kazandırır.',
      },
      {
        zamanDamgasi: 85,
        tip: 'dogru_yanlis',
        soruMetni: 'Ormana atılan cam şişeler hiçbir zarar vermez, doğada kendi kendine yok olur gider.',
        dogruCevap: false,
        geriBildirimDogru: 'Çok doğru! Cam şişeler güneş ışığını mercek gibi toplayıp orman yangınlarına sebep olabilir.',
        geriBildirimYanlis: 'Aman dikkat! Cam şişeler güneş altında ısınıp kuru otları yakabilir ve orman yangınlarına neden olabilir.',
      },
      {
        zamanDamgasi: 130,
        tip: 'coktan_secmeli',
        soruMetni: 'Ayşe ve Emir parktaki çöpleri toplayınca neden kalplerinde bir ferahlık hissettiler?',
        secenekler: [
          { id: 'A', metin: 'Sadece anneleri onlara aferin diyecek diye.', dogruMu: false },
          { id: 'B', metin: "Allah'ın emaneti olan doğayı temizledikleri ve canlıları tehlikeden korudukları için.", dogruMu: true },
        ],
        geriBildirimDogru: "Harika! Doğayı korumak hem vicdanımızı rahatlatır hem de Allah'ı memnun eder.",
        geriBildirimYanlis: "Çevreyi temizlemek sadece övgü almak için değil, Allah'ın yarattığı doğayı korumak için yapılır.",
      },
    ],
    tefekkurSorulari: [
      'Sence etrafındaki herkes yere bir çöp atsaydı dünyamız nasıl bir yer olurdu?',
      'Sokaktaki kedi ve köpeklerin temiz bir çevrede yaşaması bizim sorumluluğumuz mudur?',
    ],
    haftaninGorevi: {
      baslik: 'Çevre Kahramanı Görevi',
      aciklama: 'Bugün dışarıda veya okulda gördüğün, başkasına ait olan en az 3 çöpü yerden alıp geri dönüşüme veya çöp kutusuna at.',
    },
    kazanilanRozet: 'Doğa Koruyucusu Rozeti',
  },

  23: {
    // Hediyeleşmek
    tema: 'Sevgiyi Göstermek ve Cömertlik',
    ogrenmeHedefleri: [
      'Hediyeleşmenin insanlar arasındaki sevgiyi nasıl artırdığını anlayabileceksin.',
      'Hediyenin değerinin fiyatında değil, içindeki sevgide olduğunu fark edebileceksin.',
      'Kendi ellerin ile küçük hediyeler hazırlayıp sevdiklerine vermeyi uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Hediyeleşmek',
        anlam: 'Karşılıksız olarak, sadece sevgiyi ve dostluğu pekiştirmek için birine bir eşya veya güzel bir şey vermek.',
      },
      {
        kavram: 'Cömertlik',
        anlam: 'Sahip olduğu imkanları cimrilik yapmadan başkalarıyla paylaşabilmek.',
      },
    ],
    guzelSoz: {
      metin: 'Az veren candan, çok veren maldan.',
      kaynak: '— Türk Atasözü',
      aciklama: 'Bu atasözü bize hediyenin değerinin fiyatında değil, gönülden verilmesinde olduğunu anlatıyor. Küçücük bir hediye bile candan verildiğinde dünyalar kadar değerli olur. Hediyeleşmek sevgiyi ve dostluğu güçlendirir.',
    },
    girisKancasi: {
      soru: 'Birisine hediye aldığında en çok ne hissetmeyi seversin: Hediyeyi verirken mi daha mutlusundur, yoksa hediye alırken mi?',
      ipucu: 'Bazen küçücük bir hediye, dünyalar kadar büyük bir sevgi köprüsü kurar.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 35,
        tip: 'dogru_yanlis',
        soruMetni: 'Bir hediye ancak çok pahalı ve büyükse karşı tarafı mutlu eder. Küçük bir toka hediye sayılmaz.',
        dogruCevap: false,
        geriBildirimDogru: 'Çok doğru! Hediyenin büyüğü küçüğü olmaz, önemli olan onu sevgiyle vermektir.',
        geriBildirimYanlis: 'Yanlış! Hediyenin maddi değeri değil, içindeki sevgi önemlidir. Bir toka bile arkadaşımızı çok mutlu edebilir.',
      },
      {
        zamanDamgasi: 80,
        tip: 'bilgi_karti',
        metin: 'Peygamber Efendimiz (s.a.v) hediyeleşmeyi çok sever, kendisine verilen bir bardak sütü bile geri çevirmez, mutlaka karşılığını vermeye çalışırdı.',
      },
      {
        zamanDamgasi: 120,
        tip: 'coktan_secmeli',
        soruMetni: 'Dedemize göre hediyeleşmek insanların arasında neyi artırır?',
        secenekler: [
          { id: 'A', metin: 'Kıskançlığı ve yarışmayı artırır.', dogruMu: false },
          { id: 'B', metin: 'Sevgiyi artırır ve kalpleri birbirine yakınlaştırır.', dogruMu: true },
        ],
        geriBildirimDogru: 'Mükemmel! Hediyeleşmek kalpten kalbe giden en güzel sevgi yoludur.',
        geriBildirimYanlis: 'Hediyeleşmek insanları birbirinden uzaklaştırmaz, tam tersine sevgiyle birbirine bağlar.',
      },
    ],
    tefekkurSorulari: [
      'Kendi ellerinle yaptığın bir resmi annene hediye etmek sence neden mağazadan alınan bir hediye kadar kıymetlidir?',
      'Hiç beklemediğin bir anda arkadaşından aldığın bir hediye gününü nasıl güzelleştirir?',
    ],
    haftaninGorevi: {
      baslik: 'Küçük Sürpriz Görevi',
      aciklama: 'Bugün kendi ellerinle küçük bir resim çiz veya bir not yazıp bunu ailenden birine veya bir arkadaşına hediye et.',
    },
    kazanilanRozet: 'Cömertlik ve Sevgi Rozeti',
  },

  24: {
    // Terbiye
    tema: 'Güzel Ahlak ve Saygı',
    ogrenmeHedefleri: [
      'Terbiye ve nezaket kurallarının toplum hayatında neden önemli olduğunu anlayabileceksin.',
      'Sadece evde değil, sokakta ve toplum içinde de nazik davranmanın gerekliliğini fark edebileceksin.',
      'Büyüklere yer vermek, selam vermek gibi görgü kurallarını günlük hayatında uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Terbiye',
        anlam: 'Toplum içinde nasıl davranılması gerektiğini bilmek, büyüklere saygılı, küçüklere sevgili olmak.',
      },
      {
        kavram: 'Nezaket Kuralları',
        anlam: 'İnsanları rahatsız etmeden, kibar ve ince düşünceli bir şekilde davranma kuralları.',
      },
    ],
    guzelSoz: {
      metin: 'İnsanı yaşat ki devlet yaşasın.',
      kaynak: '— Şeyh Edebali',
      aciklama: 'Şeyh Edebali bu sözüyle güzel ahlakın ve terbiyenin toplumun temeli olduğunu anlatıyor. Güzel terbiye hayat boyunca işimize yarar ve bizi sevilen bir insan yapar. Ailemizin bize verdiği en büyük hediye güzel terbiyedir.',
    },
    girisKancasi: {
      soru: 'Otobüste giderken yaşlı bir teyzenin ayakta kaldığını görsen ne yaparsın?',
      ipucu: 'Gerçek terbiye, ailemizin yanında nasılsak dışarıda da aynı güzellikte davranmaktır.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 35,
        tip: 'bilgi_karti',
        metin: 'İslam ahlakına göre büyüklere yer vermek, yolda yardıma ihtiyacı olanlara yardım etmek imanın ve güzel terbiyenin bir göstergesidir.',
      },
      {
        zamanDamgasi: 90,
        tip: 'coktan_secmeli',
        soruMetni: "Ayşe ve Emir bakkalda amcanın cüzdanını düşürdüğünü görünce ne yaptılar?",
        secenekler: [
          { id: 'A', metin: 'Cüzdanı alıp amcaya hemen teslim ettiler.', dogruMu: true },
          { id: 'B', metin: 'Cüzdanı görmezden gelip oyunlarına devam ettiler.', dogruMu: false },
        ],
        geriBildirimDogru: 'Çok güzel! Düşen bir eşyayı sahibine vermek dürüstlüğün ve terbiyenin en güzel örneğidir.',
        geriBildirimYanlis: 'Başkasına ait bir eşyayı gördüğümüzde onu sahibine ulaştırmak terbiyeli bir insanın görevidir.',
      },
      {
        zamanDamgasi: 130,
        tip: 'dogru_yanlis',
        soruMetni: 'Terbiyeli olmak sadece evde annemiz ve babamızın yanında kurallara uymaktır, sokakta istediğimiz gibi davranabiliriz.',
        dogruCevap: false,
        geriBildirimDogru: 'Harika! Terbiye sadece sözle değil, dışarıdaki hal ve hareketlerimizle, tanımadığımız insanlara karşı da belli olur.',
        geriBildirimYanlis: 'Yanlış! Gerçek terbiye, tanımadığımız insanlara karşı sokakta veya otobüste gösterdiğimiz saygıyla ölçülür.',
      },
    ],
    tefekkurSorulari: [
      'Toplu taşıma araçlarında yüksek sesle konuşmak sence terbiyeli bir davranış mıdır? Neden?',
      "Ailenin sana verdiği 'güzel terbiye' sence neden sana verecekleri en büyük hediyedir?",
    ],
    haftaninGorevi: {
      baslik: 'Saygı ve Terbiye Görevi',
      aciklama: 'Bugün dışarıda veya okulda tanımadığın bir büyüğüne kapıyı tut, ona selam ver veya yardımcı ol.',
    },
    kazanilanRozet: 'Güzel Ahlak Rozeti',
  },

  25: {
    // Sır Saklamak
    tema: 'Güvenilirlik ve Emaneti Koruma',
    ogrenmeHedefleri: [
      'Sır saklamanın neden bir emanet olduğunu ve güvenilirlik ile ilişkisini anlayabileceksin.',
      'Başkalarının sırlarını ifşa etmenin dostluğa ve güvene nasıl zarar verdiğini fark edebileceksin.',
      'Sana anlatılan sırları korumayı ve güvenilir bir sırdaş olmayı uygulayabileceksin.',
    ],
    kavramlar: [
      {
        kavram: 'Sır',
        anlam: 'Başkalarının bilmemesi gereken, sadece güvendiğimiz kişilerle paylaştığımız gizli bilgi.',
      },
      {
        kavram: 'Sırdaşlık',
        anlam: 'Kendisine verilen sırrı ne pahasına olursa olsun koruyan, başkasına anlatmayan güvenilir kişi.',
      },
    ],
    guzelSoz: {
      metin: 'Sır saklayan güç sahibi olur, sır veren güçsüz düşer.',
      kaynak: '— Hz. Ali (Hikmetli Söz)',
      aciklama: 'Hz. Ali bu sözüyle sır saklamanın bir güç ve güvenilirlik işareti olduğunu anlatıyor. Birisi sana bir sır söylüyorsa, bu sana güvendiği anlamına gelir ve bu bir emanettir. O sırrı başkalarına söylememelisin.',
    },
    girisKancasi: {
      soru: "Bir arkadaşın sana 'bunu kimseye söyleme' diyerek bir sır verse, annene veya en yakın arkadaşına söyler misin?",
      ipucu: 'Ağızdan çıkan bir sır, kafesten uçan bir kuş gibidir; bir daha geri döndüremezsin.',
    },
    interaktifDuraklamalar: [
      {
        zamanDamgasi: 45,
        tip: 'dogru_yanlis',
        soruMetni: "Ayşe, annesi Emir'in ne sakladığını sorduğunda hemen dayanamayıp sırrı annesine anlatmıştır.",
        dogruCevap: false,
        geriBildirimDogru: "Doğru bildin! Ayşe ne kadar sıkıştırılsa da Emir'in sırrını tutmuş ve emanete ihanet etmemiştir.",
        geriBildirimYanlis: "Hayır, Ayşe çok güvenilir biriydi ve annesi sorduğunda bile Emir'in sırrını söylemedi.",
      },
      {
        zamanDamgasi: 95,
        tip: 'bilgi_karti',
        metin: "İslam dinine göre bir sır, bize bırakılan altın veya paradan farksız bir 'emanet'tir. Sırrı başkasına söylemek emanete ihanet etmektir.",
      },
      {
        zamanDamgasi: 135,
        tip: 'coktan_secmeli',
        soruMetni: 'Dedemize göre bir sır iyiliğe ve sürprize dönüşüyorsa onu saklamak için ne yapmalıyız?',
        secenekler: [
          { id: 'A', metin: 'O sırrı tutup susmak en doğru olanıdır.', dogruMu: true },
          { id: 'B', metin: 'Sürprizi bozmak için hemen gidip herkese söylemeliyiz.', dogruMu: false },
        ],
        geriBildirimDogru: 'Mükemmel! Sır tutmak zordur ama bir iyilik taşıyorsa susmak en büyük erdemdir.',
        geriBildirimYanlis: 'Eğer sır güzel bir sürprizse, onu söylemek sürprizi mahveder. Tutmak gerekir.',
      },
    ],
    tefekkurSorulari: [
      'Senin bir sırrını başkasına anlatan bir arkadaşına bir daha güvenir misin?',
      'Eğer bir arkadaşının sırrı (örneğin kendine zarar vereceği bir şey) tehlikeli bir sırsa, bunu yine de saklamalı mıyız, yoksa bir büyüğe mi söylemeliyiz?',
    ],
    haftaninGorevi: {
      baslik: 'Güvenilir Sırdaş Görevi',
      aciklama: 'Bugün ailenin veya arkadaşlarının sana özel olarak söylediği bir şeyi bir başkasıyla paylaşmadan kalbinde sıkıca sakla.',
    },
    kazanilanRozet: 'Emin Sırdaş Rozeti',
  },

  // === Lesson 36: Vefâkârlık (video_38) ===
  36: {
    tema: 'Yapılan İyiliği Unutmamak ve Kadirşinaslık',
    ogrenmeHedefleri: [
      'Vefa ve kadirşinaslık kavramlarını anlayabilecek ve yapılan iyilikleri unutmamanın önemini öğrenebileceksin.',
      'Vefalı insanların toplumda nasıl sevildiğini ve saygı gördüğünü fark edebileceksin.',
      'Sana iyilik eden insanlara teşekkür etmeyi ve onları unutmamayı uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Vefa', anlam: 'Sevgide, dostlukta ve sözünde durmak. Yapılan bir iyiliği hiçbir zaman unutmamak.' },
      { kavram: 'Kadirşinaslık', anlam: 'Kıymet bilmek, emeği geçen insanlara karşı teşekkür borçlu olduğunu hissetmek.' },
    ],
    guzelSoz: { metin: 'İyiliğe iyilik her kişinin kârı, kötülüğe iyilik er kişinin kârı.', kaynak: '— Yunus Emre', aciklama: 'Yunus Emre bu sözüyle bize iyiliğe iyilikle karşılık vermenin herkesin yapabileceği bir şey olduğunu ama asıl yiğitliğin kötülüğe bile iyilikle karşılık vermek olduğunu anlatıyor. Bize yapılan bir iyiliği unutmamalı ve mümkünse karşılığını vermeliyiz.' },
    girisKancasi: { soru: 'Zor bir anında sana yardım eden bir arkadaşına daha sonra sen nasıl teşekkür edersin?', ipucu: 'Gerçek dostluklar zor zamanlarda edilen yardımların hiç unutulmamasıyla kurulur.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 40, tip: 'bilgi_karti', metin: 'Biliyor muydun? Peygamber Efendimiz (s.a.v) kendisine yıllar önce süt annelik yapan Halime annemizi ne zaman görse cübbesini yere serer, onu saygıyla oturturdu. İşte bu vefanın en güzel örneğidir.' },
      { zamanDamgasi: 95, tip: 'dogru_yanlis', soruMetni: 'Vefalı bir insan, sadece kendi işi düştüğünde başkalarına iyi davranan kişidir.', dogruCevap: false, geriBildirimDogru: 'Harika! Vefalı insan, aradan yıllar geçse bile kendisine yapılan iyiliği unutmayan kişidir.', geriBildirimYanlis: 'Yanlış! Sadece işi düştüğünde arayan kişiye menfaatçi denir. Vefa ise karşılıksız sevgidir ve unutmamaktır.' },
      { zamanDamgasi: 140, tip: 'coktan_secmeli', soruMetni: 'Mühendis olan genç, yaşlı ustayı neden kendi yanına işe almıştır?', secenekler: [{ id: 'A', metin: 'Yaşlı adam ucuza çalışacağı için.', dogruMu: false }, { id: 'B', metin: 'Gençliğinde ustasının ona yaptığı iyilikleri unutmadığı ve vefalı olduğu için.', dogruMu: true }], geriBildirimDogru: 'Çok doğru! Vefa, üzerinden ne kadar zaman geçerse geçsin iyiliği hatırlamaktır.', geriBildirimYanlis: 'Hayır. Genç mühendis bunu bir menfaat için değil, vefa borcunu ödemek için yapmıştır.' },
    ],
    tefekkurSorulari: ['Sana okumayı, yazmayı öğreten öğretmenlerine karşı nasıl vefalı olabilirsin?', 'Arkadaşın Emir karda düştüğünde Ahmet ona yardım etmişti. Daha sonra Ahmet düşünce Emir ne yaptı? Bu bize ne öğretiyor?'],
    haftaninGorevi: { baslik: 'Vefa Elçisi Görevi', aciklama: 'Geçmişte sana bir iyiliği dokunan birine (öğretmenin, akraban veya arkadaşın) bugün teşekkür eden küçük bir not yaz veya onu ara.' },
    kazanilanRozet: 'Vefa Elçisi Rozeti',
  },

  // === Lesson 37: Cami Adabı (video_44) ===
  37: {
    tema: 'İbadet Yerlerine Saygı ve Edep',
    ogrenmeHedefleri: [
      'Cami adabını anlayabilecek ve ibadet yerlerinde nasıl davranılması gerektiğini öğrenebileceksin.',
      'Camilerin sadece bir bina değil, huzur ve ibadet mekanı olduğunu fark edebileceksin.',
      'Camiye gittiğinde sessiz olmak, sağ ayakla girmek gibi kuralları uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Cami Adabı', anlam: 'Müslümanların ibadet yeri olan camilerde nasıl davranılması, nasıl giyinilmesi ve nasıl konuşulması gerektiği kuralları.' },
      { kavram: 'Huşu', anlam: "Allah'ın huzurunda olmanın verdiği saygıyla sessiz, sakin ve boynu bükük bir şekilde durmak." },
    ],
    guzelSoz: { metin: 'Edep, insanın en güzel tacıdır. Nereye gidersen git, edebinle git.', kaynak: '— Mevlana', aciklama: 'Mevlana bu sözüyle nereye gidersek gidelim edepli ve saygılı davranmamız gerektiğini hatırlatıyor. Kutsal mekanlarda, okulda, evde veya sokakta; her yerde sessiz, edepli ve saygılı olmak güzel insanın en önemli özelliğidir.' },
    girisKancasi: { soru: "Birisi evinde uyurken veya kitap okurken yanında yüksek sesle bağırsan ne hisseder? Peki ya Allah'ın evinde ibadet edenler ne hisseder?", ipucu: 'Camiler kalplerin dinlendiği yerlerdir, orada sessizlik en güzel saygıdır.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 30, tip: 'dogru_yanlis', soruMetni: 'Çocuklar caminin içinde top oynamaya başladıklarında, imam onlara çok sert bir şekilde bağırarak camiden kovmuştur.', dogruCevap: false, geriBildirimDogru: 'Harika! İmam onlara kızıp bağırmamış, sadece cami içinde sessiz ve edepli olmaları gerektiğini sevgiyle anlatmıştır.', geriBildirimYanlis: 'Dikkatli izlemelisin. İmam onlara kızmadı, sadece buranın bir ibadet yeri olduğunu ve edepli olmaları gerektiğini nazikçe söyledi.' },
      { zamanDamgasi: 80, tip: 'bilgi_karti', metin: 'Camiler, yeryüzündeki en kıymetli mekanlardır. Oraya sağ ayakla ve dua ederek girmek, içeride koşmamak ve dünya işlerini konuşmamak cami adabındandır.' },
      { zamanDamgasi: 125, tip: 'coktan_secmeli', soruMetni: 'Hocanın uyarısından sonra çocuklar nasıl bir davranış sergilediler?', secenekler: [{ id: 'A', metin: "Topu bırakıp hocanın dizinin dibinde edeplice Kur'an dinlemeye başladılar.", dogruMu: true }, { id: 'B', metin: 'Hocayı dinlemeyip caminin bahçesinde bağırmaya devam ettiler.', dogruMu: false }], geriBildirimDogru: 'Çok güzel! Hatalarını anladılar ve camiye yakışan edebi gösterdiler.', geriBildirimYanlis: 'Hocanın tatlı uyarısı çocukların kalbine dokundu ve hemen saygıyla dinlemeye geçtiler.' },
    ],
    tefekkurSorulari: ['Caminin içinde sessizce oturup gözlerini kapattığında sence neden kendini bu kadar huzurlu hissedersin?', 'Okulun bahçesi ile caminin içi arasındaki fark nedir? İkisinde de aynı oyunlar oynanır mı?'],
    haftaninGorevi: { baslik: 'Cami Bülbülü Görevi', aciklama: "Büyüklerinle birlikte ilk fırsatta bir camiye git. İçeri girince sağ ayağınla gir, sessizce bir köşeye otur ve içinden Allah'a güzel bir dua et." },
    kazanilanRozet: 'Cami Bülbülü Rozeti',
  },

  // === Lesson 38: Kanaat (video_50) ===
  38: {
    tema: 'Kanaat, Tasarruf ve Allah Rızası İçin Biriktirmek',
    ogrenmeHedefleri: [
      'Kanaat ve tasarruf kavramlarını anlayabilecek ve gereksiz harcamalardan kaçınmanın önemini öğrenebileceksin.',
      'Nefsimizin her istediğini yapmamamız gerektiğini ve iradenin gücünü fark edebileceksin.',
      'Gereksiz bir şey almak yerine o parayı biriktirmeyi veya hayra harcamayı uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Kanaat', anlam: 'Elindekiyle yetinmeyi bilmek, gereksiz ve aşırı isteklere dur diyebilmek.' },
      { kavram: 'Tasarruf (İktisat)', anlam: 'Paramızı, eşyalarımızı veya zamanımızı boş yere harcamadan, israf etmeden kullanmak.' },
    ],
    guzelSoz: { metin: 'Tok olan dünyada en zengindir, kanaat eden en mutludur.', kaynak: '— Yunus Emre', aciklama: 'Yunus Emre bu sözüyle gerçek zenginliğin çok paraya sahip olmak değil, kalbin zengin olması yani kanaat etmek olduğunu söylüyor. Elindekiyle mutlu olmayı bilen insan dünyanın en zengin insanıdır.' },
    girisKancasi: { soru: 'Canının çok çektiği bir oyuncağı veya yiyeceği almayıp, o parayı daha güzel bir amaç için biriktirdiğin oldu mu?', ipucu: "İstanbul'da sadece 'Sanki Yedim' diyerek yapılmış kocaman bir cami olduğunu biliyor muydun?" },
    interaktifDuraklamalar: [
      { zamanDamgasi: 45, tip: 'bilgi_karti', metin: "Biliyor muydun? İstanbul'un Fatih semtinde, Keçeci Hayrettin Efendi'nin yıllarca nefsiyle mücadele edip biriktirdiği paralarla yaptırdığı 'Sanki Yedim Camii' gerçekten de vardır ve hala ibadete açıktır." },
      { zamanDamgasi: 95, tip: 'dogru_yanlis', soruMetni: 'Keçeci Hayrettin Efendi canı tatlı veya et çektiğinde parası hiç olmadığı için onları yiyemiyordu.', dogruCevap: false, geriBildirimDogru: 'Çok dikkatlisin! Parası vardı ama o, parasını anlık isteklerine harcamak yerine Allah rızası için bir cami yaptırmaya ayırıyordu.', geriBildirimYanlis: "Yanlış cevap. Aslında parası vardı ama o iradesini kullanıp 'Sanki yedim' diyerek o parayı hayırlı bir iş için sandığa atıyordu." },
      { zamanDamgasi: 140, tip: 'coktan_secmeli', soruMetni: "'Sanki yedim' demenin insana ne kazandıracağını dedemiz söylüyor?", secenekler: [{ id: 'A', metin: 'Sürekli aç kalmayı ve cimri olmayı.', dogruMu: false }, { id: 'B', metin: 'İsraftan kurtulmayı ve o birikimle hayırlı, kalıcı işler yapabilmeyi.', dogruMu: true }], geriBildirimDogru: 'Harika! Nefsimizin her istediğini yapmazsak, çok daha büyük ve güzel şeyler başarabiliriz.', geriBildirimYanlis: 'Tasarruf etmek cimrilik değildir. Hayırlı işler yapabilmek için gereksiz harcamalardan kaçınmaktır.' },
    ],
    tefekkurSorulari: ['İstediğimiz her abur cuburu veya oyuncağı anında almak bizi gerçekten uzun süre mutlu eder mi?', "Senin bir 'Sanki Yedim' kumbaran olsaydı, orada biriken parayla kimlere yardım etmek isterdin?"],
    haftaninGorevi: { baslik: 'Sanki Yedim Kumbarası Görevi', aciklama: "Bu hafta canının çok çektiği ama aslında gereksiz olan bir şeyi (örneğin bir abur cuburu) alma. 'Sanki yedim' de ve o parayı sadaka olarak ayır." },
    kazanilanRozet: 'Kanaat ve İrade Kahramanı Rozeti',
  },

  // === Lesson 39: Mesuliyet (video_59) ===
  39: {
    tema: 'Görev Bilinci ve Sorumluluk',
    ogrenmeHedefleri: [
      'Mesuliyet (sorumluluk) kavramını anlayabilecek ve üzerine düşen görevleri yapmanın önemini öğrenebileceksin.',
      'Verilen görevleri severek ve zamanında yapmanın insanları nasıl güvenilir kıldığını fark edebileceksin.',
      'Kimse hatırlatmadan kendi görevlerini yapmayı bir alışkanlık haline getirmeyi uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Mesuliyet', anlam: 'Sorumluluk demektir. İnsanın üzerine düşen görevleri zamanında ve en iyi şekilde yapmasıdır.' },
      { kavram: 'Emanet Bilinci', anlam: 'Bize verilen bir işe veya eşyaya, sanki bize aitmiş gibi gözümüz gibi bakmaktır.' },
    ],
    guzelSoz: { metin: 'Herkes kendi kapısının önünü süpürse sokaklar tertemiz olur.', kaynak: '— Türk Atasözü', aciklama: 'Bu atasözü herkesin bir sorumluluğu olduğunu anlatıyor. Anne baba evden, öğretmen sınıftan, sen de odandan ve ödevlerinden sorumlusun. Herkes kendi görevini iyi yaparsa dünya güzel bir yer olur.' },
    girisKancasi: { soru: 'Evde sadece senin yapman gereken bir görev var mı? O görevi kendi başına yapınca kendini nasıl hissedersin?', ipucu: 'Sorumluluk almak bizi büyütür ve başkalarının bize daha çok güvenmesini sağlar.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 40, tip: 'dogru_yanlis', soruMetni: 'Dedemiz bahçedeki işleri çok yorulduğu için tamamen bırakmış ve bütün işi çocuklara yıkmıştır.', dogruCevap: false, geriBildirimDogru: 'Doğru bildin! Dedemiz işleri tamamen bırakmadı, sadece iş bölümü yaptı ve herkese yapabileceği kadar bir sorumluluk verdi.', geriBildirimYanlis: "Hayır, dedemiz işleri bırakmadı. Sadece Ayşe'ye domatesleri, Emir'e gülleri vererek onlara 'mesuliyet' duygusunu öğretti." },
      { zamanDamgasi: 85, tip: 'bilgi_karti', metin: 'Büyük İslam alimi İmam-ı Gazali Hazretleri, bize verilen her nimetin ve her güzelliğin aynı zamanda bir sorumluluk gerektirdiğini söylemiştir.' },
      { zamanDamgasi: 130, tip: 'coktan_secmeli', soruMetni: 'Ayşe, Emir ve kedi Pamuk kendilerine verilen görevleri nasıl yerine getirdiler?', secenekler: [{ id: 'A', metin: 'Çok dikkatli, severek ve mesuliyet bilinciyle.', dogruMu: true }, { id: 'B', metin: 'Birkaç gün sonra sıkılıp görevlerini unuttular.', dogruMu: false }], geriBildirimDogru: 'Harika! Verilen görevi severek yapmak insanı mesuliyet sahibi yapar.', geriBildirimYanlis: 'Onlar görevlerini hiç unutmadılar. Herkes kendi alanına çok güzel baktı.' },
    ],
    tefekkurSorulari: ['Ödevlerini zamanında yapmak veya odanı temiz tutmak neden senin en büyük mesuliyetindir?', 'Görevlerini tam olarak yapan birine insanların güveni nasıl artar?'],
    haftaninGorevi: { baslik: 'Sorumluluk Görevi', aciklama: 'Bugün evde kendine ait bir görev seç (örneğin sofrayı kurmak, yatağını toplamak) ve bunu kimse sana hatırlatmadan kendin yap.' },
    kazanilanRozet: 'Mesuliyet Sahibi Rozeti',
  },

  // === Lesson 26: Kötülüğe Karşı İyilik (video_27) ===
  26: {
    tema: 'Kötülüğe İyilikle Karşılık Vermek ve Affetmek',
    ogrenmeHedefleri: [
      'Kötülüğe iyilikle karşılık vermenin ne demek olduğunu ve düşmanlıkları nasıl bitirdiğini anlayabileceksin.',
      'Öfkeni yenip gülümsemenin kavgadan çok daha güçlü bir silah olduğunu fark edebileceksin.',
      'Sana kötü davranan birine iyilikle yaklaşmayı günlük hayatında uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Affetmek', anlam: 'Bize karşı yapılan bir hatayı cezalandırmaktan vazgeçmek, kalpten silmek.' },
      { kavram: 'İyilikle Savmak', anlam: 'Bize kötü davranan birine kızmak yerine ona tebessümle ve güzel ahlakla yaklaşmak.' },
    ],
    guzelSoz: { metin: 'Kötülüğe iyilikle karşılık ver; düşmanını dost edersin.', kaynak: '— Mevlana', aciklama: 'Mevlana bu sözüyle bize kötülüğe kötülükle değil, iyilikle karşılık vermemizi öğretiyor. Böyle yapınca sana düşman olan kişi bile senin dostun olabilir. İyilik, kötülük ateşini söndüren bir su gibidir.' },
    girisKancasi: { soru: 'Biri senin oyununu bilerek bozduğunda ona bağırır mısın, yoksa gülümseyip onu da oyuna davet mi edersin?', ipucu: 'Bazen küçücük bir gülümseme, en büyük kavgaları başlamadan bitiren sihirli bir anahtardır.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 40, tip: 'dogru_yanlis', soruMetni: 'Parktaki çocuk misketleri dağıtınca Emir çok sinirlenmiş ve onunla hemen kavgaya tutuşmuştur.', dogruCevap: false, geriBildirimDogru: 'Harika! Emir sinirlense de kendini tuttu ve çocuğa bir misket verip oyuna davet etti.', geriBildirimYanlis: 'Dikkatli izlemedin sanırım. Emir öfkesini yendi ve ona iyilikle karşılık vererek onu şaşırttı.' },
      { zamanDamgasi: 90, tip: 'bilgi_karti', metin: 'Peygamber Efendimiz (s.a.v) kendisine en kötü davranan insanlara bile hep şefkatle ve iyilikle yaklaşmış, sonunda birçoğu onun en yakın dostu olmuştur.' },
      { zamanDamgasi: 135, tip: 'coktan_secmeli', soruMetni: 'Dedemize göre kötülüğe iyilikle cevap vermek ne işe yarar?', secenekler: [{ id: 'A', metin: 'Düşmanlıkları bitirir ve karşımızdakini bize dost yapar.', dogruMu: true }, { id: 'B', metin: 'İnsanların bizimle daha çok alay etmesini sağlar.', dogruMu: false }], geriBildirimDogru: 'Çok doğru! İyilik, kötülük ateşini söndüren serin bir su gibidir.', geriBildirimYanlis: 'Hayır, iyilik yapan insan asla kaybetmez. İyilik en sert kalpleri bile yumuşatır.' },
    ],
    tefekkurSorulari: ['Sence öfkelenmek mi daha kolaydır, yoksa öfkeni yutup karşındakine gülümsemek mi? Neden?', 'Birine kızdığında onun da hatasını anlayıp özür dilemesi için ona nasıl yaklaşmalısın?'],
    haftaninGorevi: { baslik: 'İyilik Meleği Görevi', aciklama: 'Bugün sana kötü davranan veya seni üzen birisine kızmak yerine ona tebessüm et ve bir iyilik yap.' },
    kazanilanRozet: 'İyilik Meleği Rozeti',
  },

  // === Lesson 27: İş Ahlakı (video_28) ===
  27: {
    tema: 'İşini Düzgün Yapmak ve Sorumluluk',
    ogrenmeHedefleri: [
      'İş ahlakı kavramını anlayabilecek ve üzerine aldığın bir işi en güzel şekilde yapmanın önemini öğrenebileceksin.',
      'Baştan savma yapılan işlerin ileride büyük sorunlara yol açabileceğini fark edebileceksin.',
      'Ödevlerini ve görevlerini yarım bırakmadan, en iyi şekilde bitirmeyi uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'İş Ahlakı', anlam: 'Üzerimize aldığımız bir işi hile yapmadan, eksiksiz ve en güzel şekilde tamamlamak.' },
      { kavram: 'Emanet', anlam: 'Bize güvenilerek teslim edilen bir göreve veya eşyaya ihanet etmemek.' },
    ],
    guzelSoz: { metin: 'Yapacağın işi en güzel şekilde yap; çünkü Allahü teâlâ güzel yapılan işi sever.', kaynak: '— Hadîs-i şerîf', aciklama: 'Bu hadîs-i şerîf işimizi severek ve özenle yapmamız gerektiğini anlatıyor. Bir iş yaptığımızda onu en güzel ve dikkatli şekilde yapmak gerekir. Yarım yamalak değil, işini özenle tamamlayan insan her zaman başarılı olur.' },
    girisKancasi: { soru: 'Sana verilen bir ödevi hemen baştan savma bitirmek mi istersin, yoksa yorulsan da en mükemmelini mi yapmak istersin?', ipucu: 'Unutma, yarım bırakılan veya baştan savma yapılan her iş, gelecekte yıkılan bir köprüye dönüşebilir.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 45, tip: 'dogru_yanlis', soruMetni: 'Ayşe ve Emir çiçekleri sulamaktan yorulunca işi tamamen yarım bırakıp içeri kaçtılar.', dogruCevap: false, geriBildirimDogru: 'Doğru bildin. Yorulmuşlardı ama dedelerinin köprü hikayesinden sonra işlerini tam ve eksiksiz bitirdiler.', geriBildirimYanlis: 'Hayır, yorulsalar da pes etmediler ve iş ahlakının ne demek olduğunu anladılar.' },
      { zamanDamgasi: 95, tip: 'bilgi_karti', metin: 'İslam dininde bir işçinin, mühendisin veya öğrencinin yaptığı işi en kaliteli şekilde yapması ibadet kadar değerli görülmüştür.' },
      { zamanDamgasi: 140, tip: 'coktan_secmeli', soruMetni: 'Dedemizin gençliğinde mühendisken anlattığı köprü hikayesi bize neyi öğretiyor?', secenekler: [{ id: 'A', metin: 'İşimizi baştan savma değil, insanların can güvenliğini düşünerek eksiksiz yapmalıyız.', dogruMu: true }, { id: 'B', metin: 'Sadece patronumuz veya öğretmenimiz izlerken çalışmalıyız.', dogruMu: false }], geriBildirimDogru: 'Harika! Kimse görmese bile Allah her şeyi görür. İşimizi dürüstçe yapmalıyız.', geriBildirimYanlis: 'Müslüman sadece başkaları izlerken değil, yalnızken de işini en iyi yapan kişidir.' },
    ],
    tefekkurSorulari: ['Sence okul ödevlerini başkasından kopyalayarak yapan biri iş ahlakına uymuş olur mu?', 'İşini dürüst yapan birine insanların güveni nasıl artar?'],
    haftaninGorevi: { baslik: 'Emeğin Bereketi Görevi', aciklama: 'Bugün başladığın hiçbir işi (ödev, oyun toplama, odanı düzenleme) yarım bırakma. En güzel şekilde bitir.' },
    kazanilanRozet: 'Emeğin Bereketi Rozeti',
  },

  // === Lesson 28: İnsana Teşekkür (video_29) ===
  28: {
    tema: 'Teşekkür Etmek, Şükür ve Minnet',
    ogrenmeHedefleri: [
      'Teşekkür etmenin ve şükretmenin arasındaki farkı anlayabileceksin.',
      'İnsanlara teşekkür etmenin onları ne kadar mutlu ettiğini fark edebileceksin.',
      'Her gün ailene, öğretmenine ve sana iyilik edenlere teşekkür etmeyi uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Teşekkür Etmek', anlam: 'Bize yapılan bir iyiliğe veya yardıma karşı sözlü olarak minnetimizi ve mutluluğumuzu belirtmek.' },
      { kavram: 'Şükür', anlam: "Allah'ın bize verdiği sağlık, aile ve yiyecek gibi tüm nimetler için O'na hamd etmek." },
    ],
    guzelSoz: { metin: 'Bir fincan kahvenin kırk yıl hatırı vardır.', kaynak: '— Türk Atasözü', aciklama: 'Bu atasözü bize yapılan iyiliği unutmamamız ve minnettar olmamız gerektiğini öğretiyor. Bize yardım eden, yemek yapan, ders öğreten insanlara teşekkür etmeyi bilmeliyiz. Küçük bir iyiliğin bile hatırını ömür boyu tutmalıyız.' },
    girisKancasi: { soru: "Biri sana yardım ettiğinde ona kocaman gülümseyerek 'Teşekkür ederim' demek sence o kişiyi nasıl hissettirir?", ipucu: 'Teşekkür etmek, kalpler arasında kurulan en tatlı sevgi köprüsüdür.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 35, tip: 'dogru_yanlis', soruMetni: "Ayşe kalemi düştüğünde ona yardım eden Zeynep'e hiçbir şey söylemeden arkasını döndü.", dogruCevap: false, geriBildirimDogru: 'Çok dikkatlisin! Ayşe hemen tebessüm edip arkadaşına teşekkür etti.', geriBildirimYanlis: "Yanlış cevap. Ayşe nazik bir çocuk olduğu için ona yardım eden Zeynep'e teşekkür etti." },
      { zamanDamgasi: 85, tip: 'bilgi_karti', metin: 'Peygamber Efendimiz (s.a.v) kendisine yapılan en küçük bir iyiliği bile asla unutmaz, o kişiye mutlaka teşekkür eder ve ona dua ederdi.' },
      { zamanDamgasi: 130, tip: 'coktan_secmeli', soruMetni: 'Emir neden annesine bir çiçek alıp sürpriz yaptı?', secenekler: [{ id: 'A', metin: 'Annesinin ona yemek yapmasını ve ona bakmasını sıradan bir görev olarak gördüğü için.', dogruMu: false }, { id: 'B', metin: 'Annesinin emeklerine karşı ona olan sevgisini ve teşekkürünü göstermek için.', dogruMu: true }], geriBildirimDogru: 'Mükemmel! Ailemizin bizim için yaptıklarına teşekkür etmek en güzel davranışlardandır.', geriBildirimYanlis: 'Ailemizin bizim için yaptıkları büyük bir fedakarlıktır, bunlara karşı hep teşekkür etmeliyiz.' },
    ],
    tefekkurSorulari: ["Sence sadece insanlara mı teşekkür ederiz? Allah'ın bize verdiği nimetlere nasıl şükrederiz?", "'Teşekkür ederim' demeyi unutan bir toplum sence nasıl bir yer olurdu?"],
    haftaninGorevi: { baslik: 'Teşekkür Elçisi Görevi', aciklama: "Bugün sana en çok emeği geçen kişiye (annene, babana veya öğretmenine) kocaman sarıl ve 'İyi ki varsın, sana teşekkür ederim' de." },
    kazanilanRozet: 'Teşekkür Elçisi Rozeti',
  },

  // === Lesson 29: Zararlı Alışkanlıklardan Kaçınmak (video_30) ===
  29: {
    tema: 'Sağlığı Korumak, İrade ve Gerçek Eğlence',
    ogrenmeHedefleri: [
      'Zararlı alışkanlıkların bedenimize ve ruhumuza nasıl zarar verdiğini anlayabileceksin.',
      'Bedenimizin bize Allah\'ın bir emaneti olduğunu ve onu korumanın görevimiz olduğunu fark edebileceksin.',
      'Ekran süresini azaltıp dışarıda oynayarak sağlıklı yaşamayı uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Zararlı Alışkanlıklar', anlam: 'Vücudumuza, gözlerimize veya aklımıza zarar veren, bizi bağımlı yapan kötü alışkanlıklar.' },
      { kavram: 'İrade', anlam: "Zararlı ve kötü olan bir şeye 'Hayır' diyebilme gücü ve kendini tutabilmek." },
    ],
    guzelSoz: { metin: 'Sağlık bir taçtır, onu ancak hastalar görür.', kaynak: '— Türk Atasözü', aciklama: 'Bu atasözü sağlığın ve zamanın ne kadar değerli olduğunu hatırlatıyor. Çoğu insan sağlıklıyken bunun kıymetini bilmez. Sağlığımızı ve zamanımızı zararlı alışkanlıklardan uzak durarak iyi kullanmalıyız.' },
    girisKancasi: { soru: 'Bütün gün dışarı çıkmadan tabletin veya televizyonun başında oturmak sence bedenimizi güçlendirir mi, yoksa bizi hasta mı eder?', ipucu: 'Gerçek eğlence ekranlarda değil, doğada ve arkadaşlarımızla oynadığımız oyunlardadır.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 40, tip: 'bilgi_karti', metin: "İslam dinine göre bedenimiz bize Allah'ın emanetidir. Onu sağlıksız yiyeceklerden ve hareketsizlikten (sürekli ekrana bakmaktan) korumak zorundayız." },
      { zamanDamgasi: 90, tip: 'dogru_yanlis', soruMetni: 'Komşunun oğlu Hasan, bütün gün tabletle oynadığı için gözleri çok sağlıklı ve yüzü çok enerjik görünüyordu.', dogruCevap: false, geriBildirimDogru: 'Doğru bildin. Aksine gözleri kızarmış, yüzü solmuştu ve çok yorgun görünüyordu.', geriBildirimYanlis: "Dikkatli izlemedin sanırım. Sürekli tablete baktığı için Hasan'ın gözleri yorulmuş ve yüzü solmuştu." },
      { zamanDamgasi: 135, tip: 'coktan_secmeli', soruMetni: "Emir, Hasan'a gerçek oyunun ve eğlencenin nerede olduğunu söyledi?", secenekler: [{ id: 'A', metin: 'Televizyondaki çizgi filmlerde.', dogruMu: false }, { id: 'B', metin: 'Dışarıda, temiz havada arkadaşlarla koşup oynanan oyunlarda.', dogruMu: true }], geriBildirimDogru: 'Harika! Hareket etmek bedenimizi sağlıklı, zihnimizi dinç tutar.', geriBildirimYanlis: 'Gerçek mutluluk ekranlarda değil, doğada ve hareket etmektedir.' },
    ],
    tefekkurSorulari: ["Canın çok tablet oynamak istediğinde kendi kendine 'Şimdi dışarı çıkmalıyım' diyerek iradeni nasıl kullanırsın?", "Sence zararlı şeylere (kötü yiyecekler veya çok fazla ekran) 'Hayır' diyebilmek neden büyük bir kahramanlıktır?"],
    haftaninGorevi: { baslik: 'Sağlıklı Yaşam Görevi', aciklama: 'Bugün ekran (TV, tablet, telefon) süreni yarıya indir. Onun yerine dışarıda oyna, ailenle sohbet et veya kitap oku.' },
    kazanilanRozet: 'Sağlıklı Yaşam Rozeti',
  },

  // === Lesson 30: Adab-ı Muaşeret (video_32) ===
  30: {
    tema: 'Görgü Kuralları, Nezaket ve Saygı',
    ogrenmeHedefleri: [
      'Adab-ı muaşeret (görgü kuralları) kavramını anlayabilecek ve toplum içinde nasıl davranman gerektiğini öğrenebileceksin.',
      'Sofra adabı, misafirlik kuralları ve selam vermenin önemini fark edebileceksin.',
      'Büyüklere öncelik vermek ve nazik konuşmak gibi görgü kurallarını uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Adab-ı Muaşeret', anlam: 'Toplum içinde insanların birbirine karşı nazik, görgülü ve saygılı davranmasını sağlayan nezaket kuralları.' },
      { kavram: 'Edep', anlam: 'Güzel ahlaklı olmak, nerede nasıl davranacağını, nasıl konuşacağını bilmek.' },
    ],
    guzelSoz: { metin: 'Güzel ahlak, güzel elbiseden daha çok yakışır insana.', kaynak: '— Şems-i Tebrizi', aciklama: 'Şems-i Tebrizi bu sözüyle en iyi ve en değerli insanın zengin veya güçlü olan değil, ahlakı en güzel olan olduğunu söylüyor. Nazik, saygılı ve görgülü olmak insanı en güzel yapan şeydir.' },
    girisKancasi: { soru: 'Bir arkadaşının veya akrabanın evine misafirliğe gittiğinde içeri girince ilk olarak ne yaparsın?', ipucu: 'Müslümanın süsü, taktığı takılar değil, taşıdığı güzel edeptir.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 40, tip: 'dogru_yanlis', soruMetni: 'Ayşe misafirliğe gidince büyüklerine selam vermeden hemen koşarak boş bulduğu bir köşeye oturdu.', dogruCevap: false, geriBildirimDogru: 'Harika! Ayşe dedesinin öğrettiği gibi önce güzelce selam verdi, sonra edeplice oturdu.', geriBildirimYanlis: 'Yanlış cevap! Ayşe önce büyüklerine saygıyla selam vermiş, ardından yerine geçmişti.' },
      { zamanDamgasi: 85, tip: 'bilgi_karti', metin: 'Sofraya oturulduğunda büyükler yemeğe başlamadan yemeğe saldırmamak ve yemeği sessizce beklemek çok önemli bir görgü (adab) kuralıdır.' },
      { zamanDamgasi: 130, tip: 'coktan_secmeli', soruMetni: "Emir sofrada yemek yerken nasıl bir 'Adab-ı Muaşeret' kuralına uydu?", secenekler: [{ id: 'A', metin: 'Babası yemeğe başlamadan önce yemeğe saldırmadı ve ekmeği nazikçe istedi.', dogruMu: true }, { id: 'B', metin: 'Herkesi beklemeden kendi yemeğini hızlıca yemeye başladı.', dogruMu: false }], geriBildirimDogru: 'Çok doğru! Sofrada büyüklere saygı göstermek adab-ı muaşerettir.', geriBildirimYanlis: 'Müslümanlar sofrada sabırlı ve nazik olurlar, Emir de öyle davranmıştı.' },
    ],
    tefekkurSorulari: ['Edepli ve nazik insanların çok olduğu bir sınıfta veya mahallede sence kavgalar olur mu?', "Konuşurken 'Lütfen' ve 'Teşekkür ederim' demek bizi neden daha güzel bir insan yapar?"],
    haftaninGorevi: { baslik: 'Görgü ve Nezaket Görevi', aciklama: "Bugün sofraya otururken büyüklere öncelik ver. Yemekten kalkarken de mutlaka annene veya yemeği yapana 'Ellerinize sağlık' demeyi unutma." },
    kazanilanRozet: 'Görgü ve Nezaket Rozeti',
  },

  // === Lesson 31: Alçak Gönüllülük (video_33) ===
  31: {
    tema: 'Tevazu, Kibir ve Başarıyı Paylaşmak',
    ogrenmeHedefleri: [
      'Alçak gönüllülük (tevazu) ve kibir kavramlarını anlayabilecek ve aralarındaki farkı öğrenebileceksin.',
      'Başarılarınla övünmenin seni küçülttüğünü, mütevazı olmanın ise yücelttiğini fark edebileceksin.',
      'Başarılarını arkadaşlarınla paylaşmayı ve onları da takdir etmeyi uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Alçak Gönüllülük (Tevazu)', anlam: 'Başarılarından dolayı böbürlenmemek, kendini başkalarından üstün görmemek.' },
      { kavram: 'Kibir', anlam: "Kendini büyük görmek, başkalarını küçümsemek. İslam'da en sevilmeyen huylardandır." },
    ],
    guzelSoz: { metin: 'Dolmayan başak dik durur, dolan başak eğilir.', kaynak: '— Türk Atasözü', aciklama: 'Bu atasözü mütevazı olmanın önemini anlatıyor. Tıpkı içi dolu başağın eğilmesi ve boş başağın dik durması gibi, gerçekten bilgili ve olgun insan alçak gönüllüdür. Kendini büyük gören kibirli insan ise aslında içi boş demektir.' },
    girisKancasi: { soru: "Bir yarışmada birinci olduğunda 'En iyi benim, kimse beni geçemez!' demek mi, yoksa arkadaşlarına teşekkür etmek mi daha güzeldir?", ipucu: 'Unutma; başak (buğday) büyüdükçe ve içi doldukça boynunu büker, boş başaklar ise hep dik durur.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 40, tip: 'bilgi_karti', metin: 'Peygamber Efendimiz (s.a.v) o kadar büyük bir lider olmasına rağmen, toplum içinde sıradan biri gibi oturur, hiçbir zaman kendini arkadaşlarından üstün görmezdi.' },
      { zamanDamgasi: 90, tip: 'dogru_yanlis', soruMetni: "Emir futbolda iki gol atınca bütün başarıyı sadece kendisine almış ve arkadaşı Ahmet'e hiç teşekkür etmemiştir.", dogruCevap: false, geriBildirimDogru: "Harika! Emir 'Ahmet bana pas vermeseydi ben bu golleri atamazdım' diyerek başarısını arkadaşıyla paylaştı.", geriBildirimYanlis: "Yanlış! Emir kibirlenmedi, aksine alçakgönüllü davranarak Ahmet'e teşekkür etti." },
      { zamanDamgasi: 135, tip: 'coktan_secmeli', soruMetni: 'Ayşe öğretmeni tarafından resmi beğenildiğinde nasıl bir tavır sergiledi?', secenekler: [{ id: 'A', metin: 'Arkadaşlarını küçümsedi ve sadece kendi resmiyle övündü.', dogruMu: false }, { id: 'B', metin: "Arkadaşı Fatma'nın da resminin çok güzel olduğunu söyleyerek tevazu gösterdi.", dogruMu: true }], geriBildirimDogru: 'Mükemmel! Kendi başarımıza sevinirken arkadaşlarımızın emeklerini de takdir etmeliyiz.', geriBildirimYanlis: 'Kibir insanı küçültür, alçakgönüllülük ise yüceltir. Ayşe alçakgönüllü davrandı.' },
    ],
    tefekkurSorulari: ['Başkalarının yeteneklerini ve başarılarını övmek sence bizim kendi yeteneğimizi küçültür mü?', "Dedemizin anlattığı 'Kibir insanı küçültür, alçak gönüllülük yüceltir' sözü sence ne anlama geliyor?"],
    haftaninGorevi: { baslik: 'Tevazu Tacı Görevi', aciklama: 'Bugün kendi başarına veya eşyalarına sevinmek yerine, bir arkadaşının veya kardeşinin yaptığı güzel bir şeyi içtenlikle öv ve onu tebrik et.' },
    kazanilanRozet: 'Tevazu Tacı Rozeti',
  },

  // === Lesson 32: Vatan Sevgisi (video_34) ===
  32: {
    tema: 'Vatanı Korumak, Özgürlük ve Fedakarlık',
    ogrenmeHedefleri: [
      'Vatan kavramını anlayabilecek ve vatanın neden sadece bir toprak parçası olmadığını öğrenebileceksin.',
      'Bağımsızlığın ve özgürlüğün kıymetini ve bunun için yapılan fedakarlıkları fark edebileceksin.',
      'Bir öğrenci olarak vatanına nasıl hizmet edebileceğini kavrayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Vatan', anlam: 'Üzerinde doğup büyüdüğümüz, kültürümüzü ve inancımızı özgürce yaşadığımız kutsal topraklar.' },
      { kavram: 'Bağımsızlık', anlam: 'Kendi ülkemizde başka hiçbir ülkenin emri altına girmeden, ezanlarımızla ve bayrağımızla hür yaşamak.' },
    ],
    guzelSoz: { metin: 'Vatanını en çok seven, işini en iyi yapandır.', kaynak: '— Mustafa Kemal Atatürk', aciklama: 'Atatürk bu sözüyle vatanımızı sevmenin en güzel yolunun onu korumak ve ona hizmet etmek olduğunu hatırlatıyor. Vatanımız, üzerinde yaşadığımız, ailelerimizle birlikte olduğumuz ve özgürce büyüdüğümüz kutsal bir emanettir.' },
    girisKancasi: { soru: 'Evimiz bizim için ailemizle güvende hissettiğimiz sıcak bir yuvadır. Peki ya ülkemiz bizim için nedir?', ipucu: 'Bayrağımızın rengi neden kırmızıdır biliyor musun? O, vatanı için fedakarlık yapan dedelerimizin kahramanlığını anlatır.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 40, tip: 'bilgi_karti', metin: 'Vatan sadece bir toprak parçası değildir. Üzerinde camilerimizin, okullarımızın olduğu, dedelerimizin bize kanlarıyla emanet ettiği büyük evimizdir.' },
      { zamanDamgasi: 85, tip: 'dogru_yanlis', soruMetni: 'Dedemize göre, bir insanın vatanı işgal edilirse o insan evinde huzurla oyun oynayıp hayatına devam edebilir.', dogruCevap: false, geriBildirimDogru: 'Doğru bildin! Vatan olmadan evde huzur olmaz. Vatanı korumak evimizi korumaktır.', geriBildirimYanlis: 'Hayır! Vatanımız güvende değilse, evimiz de güvende olamaz. Vatan bizim her şeyimizdir.' },
      { zamanDamgasi: 130, tip: 'coktan_secmeli', soruMetni: "Dedemiz gençliğinde Kıbrıs'a neden savaşa gitmiştir?", secenekler: [{ id: 'A', metin: 'Gezmek ve yeni yerler görmek için.', dogruMu: false }, { id: 'B', metin: 'Oradaki kardeşlerimizi korumak ve vatan uğruna fedakarlık yapmak için.', dogruMu: true }], geriBildirimDogru: 'Çok güzel! Vatanı korumak büyük bir onurdur ve dedemiz de bir Kıbrıs Gazisidir.', geriBildirimYanlis: 'Dedemiz oraya vatan savunması ve oradaki insanlara yardım etmek için gitti.' },
    ],
    tefekkurSorulari: ['Gökyüzünde dalgalanan ay yıldızlı bayrağımızı gördüğünde kalbinde nasıl bir duygu hissediyorsun?', 'Bugün bir öğrenci olarak vatanına hizmet etmenin ve onu korumanın en güzel yolu nedir?'],
    haftaninGorevi: { baslik: 'Vatan Sevdalısı Görevi', aciklama: 'Bugün İstiklal Marşımızı içinden hissederek oku ve vatanımız için canını feda eden tüm şehitlerimize bir dua et.' },
    kazanilanRozet: 'Vatan Sevdalısı Rozeti',
  },

  // === Lesson 33: İnsanlarla İyi Geçinmek (video_35) ===
  33: {
    tema: 'Ülfet, Barış ve Anlayış',
    ogrenmeHedefleri: [
      'Ülfet (iyi geçinmek) kavramını anlayabilecek ve insanlarla barış içinde yaşamanın önemini öğrenebileceksin.',
      'Kavga etmek yerine konuşarak ve anlayışla sorun çözmenin daha güzel olduğunu fark edebileceksin.',
      'Arkadaşlarınla anlaşmazlık yaşadığında uzlaşma yolunu bulmayı uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Ülfet (İyi Geçinmek)', anlam: 'İnsanlarla dostça, kavgadan uzak ve anlayışlı bir şekilde yaşamak.' },
      { kavram: 'Uzlaşmak', anlam: 'Bir anlaşmazlık çıktığında kavgayı büyütmek yerine orta yolu bulup barışmak.' },
    ],
    guzelSoz: { metin: 'Gülü seven dikenine katlanır.', kaynak: '— Mevlana', aciklama: 'Mevlana bu sözüyle insanlarla güzel geçinmenin sırrını anlatıyor. Herkesin kusuru olabilir ama gerçek dostluk kusurları hoş görmekle başlar. Cana yakın ve geçimli olmak insanın en güzel özelliğidir.' },
    girisKancasi: { soru: 'Oyunda arkadaşınla hangi oyunu oynayacağınız konusunda anlaşamadığınızda hemen küser misin, yoksa orta yolu mu bulursun?', ipucu: 'En güzel oyunlar, herkesin gülümsediği ve birbirine saygı duyduğu oyunlardır.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 40, tip: 'dogru_yanlis', soruMetni: "Emir'in misketini bir arkadaşı yanlışlıkla aldığında, Emir hemen bağırarak kavga çıkarmıştır.", dogruCevap: false, geriBildirimDogru: 'Harika! Emir kavga etmek yerine durumu nazikçe anlattı ve sorun tatlılıkla çözüldü.', geriBildirimYanlis: 'Dikkatli izlemedin sanırım. Emir kavga etmek yerine nazikçe sordu ve arkadaşı misketi geri verdi.' },
      { zamanDamgasi: 90, tip: 'bilgi_karti', metin: 'İslam dini bir barış dinidir. Müslümanların birbiriyle iyi geçinmesini, sorunları konuşarak ve birbirlerini kırıp dökmeden çözmesini emreder.' },
      { zamanDamgasi: 135, tip: 'coktan_secmeli', soruMetni: 'Ayşe, top için tartışan çocukları görünce ne yaptı?', secenekler: [{ id: 'A', metin: 'Onların arasına girip onlara kızdı.', dogruMu: false }, { id: 'B', metin: 'Onlara sırayla oynamayı teklif ederek aralarını buldu ve iyi geçinmelerini sağladı.', dogruMu: true }], geriBildirimDogru: 'Çok doğru! İnsanların arasını düzeltmek ve barışı sağlamak çok sevaptır.', geriBildirimYanlis: 'Ayşe onlara kızmadı, tatlı bir dille onlara çözüm bulup barıştırdı.' },
    ],
    tefekkurSorulari: ['Sürekli kavga eden, her şeye sinirlenen biri sence etrafında arkadaş bulabilir mi?', "Bugün bir arkadaşınla anlaşmazlığa düşsen ona 'ülfet' (iyi geçinme) ile nasıl yaklaşırsın?"],
    haftaninGorevi: { baslik: 'Barış ve Ülfet Görevi', aciklama: 'Bugün arkadaşlarınla veya kardeşinle oynarken sadece kendi istediğini yapmak yerine onların da fikrini sor ve uyumlu ol.' },
    kazanilanRozet: 'Barış Elçisi Rozeti',
  },

  // === Lesson 34: İktisât ve Kanaatkârlık (video_36) ===
  34: {
    tema: 'Kanaat Etmek ve Dünya Malına Değer Vermemek',
    ogrenmeHedefleri: [
      'Kanaat kavramını anlayabilecek ve gerçek zenginliğin para değil gönül zenginliği olduğunu öğrenebileceksin.',
      'Sürekli daha fazlasını istemenin insanı mutsuz ettiğini fark edebileceksin.',
      'Sahip olduğun güzellikler için şükretmeyi ve elindekiyle mutlu olmayı uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Kanaat', anlam: "Allah'ın verdiği nimetlere razı olmak, sahip olduklarıyla mutlu olup sürekli daha fazlası için hırslanmamak." },
      { kavram: 'Dünya Malına Tamah Etmemek', anlam: 'Altın, para ve zenginliği kalbe sokmamak; asıl zenginliğin iyi bir kalp olduğuna inanmak.' },
    ],
    guzelSoz: { metin: 'Kanaat gibi zenginlik, açgözlülük gibi fakirlik yoktur.', kaynak: '— Hz. Ali (Hikmetli Söz)', aciklama: 'Hz. Ali bu sözüyle kanaatin hiç bitmeyen bir hazine olduğunu söylüyor. Elindekiyle yetinmeyi bilen insan her zaman zengindir. Ama sürekli daha fazla isteyen insan hiçbir zaman tatmin olmaz. Kanaat, kalbi zengin eden sihirli bir anahtardır.' },
    girisKancasi: { soru: 'Sence çok fazla paraya ve altına sahip olmak mı insanı gerçekten zengin yapar, yoksa elindeki oyuncaklarla mutlu olmayı bilmek mi?', ipucu: 'Kalbi altınla değil kanaatle dolu olan insanlar, dünyadaki en zengin insanlardır.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 45, tip: 'bilgi_karti', metin: "Allah dostları (Evliyalar), dünya malını ellerinde tutsalar bile kalplerine asla sokmazlar. Onlar için Allah'ın rızası dünyadaki tüm altınlardan daha kıymetlidir." },
      { zamanDamgasi: 100, tip: 'dogru_yanlis', soruMetni: "Yemen'deki büyük veli zat (derviş), Bağdatlı zenginin getirdiği bir torba altını görünce çok sevinip onu hemen evine almıştır.", dogruCevap: false, geriBildirimDogru: 'Harika! Tam aksine, o zat dünya malına değer vermediği için altınları reddetmiş ve adamı yanından uzaklaştırmıştır.', geriBildirimYanlis: 'Dikkatli izlemelisin. Evliya zat altınlara hiç sevinmedi, aksine dünya malıyla övünen o zengini yanından kovdu.' },
      { zamanDamgasi: 150, tip: 'coktan_secmeli', soruMetni: 'Fakir görünümlü derviş neden zengin adamın verdiği altınları reddetti?', secenekler: [{ id: 'A', metin: 'Altınları az bulduğu ve daha fazlasını istediği için.', dogruMu: false }, { id: 'B', metin: "Çünkü Allah dostları için paranın bir değeri yoktur, onların kalbi 'Kanaat' hazinesiyle doludur.", dogruMu: true }], geriBildirimDogru: 'Mükemmel! Gerçek zenginlik cebimizde olan değil, kalbimizde olandır.', geriBildirimYanlis: 'Hayır, onlar daha fazla para istemezler. Onlar ellerindekiyle yetinmeyi (kanaati) bilirler.' },
    ],
    tefekkurSorulari: ['Kalbinde kanaat (yetinme duygusu) olmayan bir insan ne kadar çok oyuncağı olursa olsun neden hep daha fazlasını ister?', 'Sence yoksul görünümlü ama kalbi Allah sevgisiyle dolu olan o derviş, Bağdatlı zenginden daha mı mutludur?'],
    haftaninGorevi: { baslik: 'Kanaat Hazinesi Görevi', aciklama: "Bugün yeni bir oyuncak veya abur cubur istemek yerine, sahip olduğun güzellikleri düşün ve Allah'a 'Elhamdülillah' diyerek şükret." },
    kazanilanRozet: 'Kanaat Hazinesi Rozeti',
  },

  // === Lesson 35: Emanete Riayet Etmek (video_37) ===
  35: {
    tema: 'Emaneti Korumak ve Güvenilir Olmak',
    ogrenmeHedefleri: [
      'Emanet kavramının sadece eşyalarla sınırlı olmadığını, sağlığımızın ve zamanımızın da emanet olduğunu anlayabileceksin.',
      'Emanete riayet etmenin güvenilir bir insan olmanın temeli olduğunu fark edebileceksin.',
      'Sana verilen her emaneti en güzel şekilde korumayı ve sahibine teslim etmeyi uygulayabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Emanet', anlam: 'Bize geçici olarak bırakılan, koruması bize ait olan her şey: eşya, sır, görev veya sorumluluk.' },
      { kavram: 'Riayet', anlam: 'Bir kurala, söze veya göreve dikkat etmek, onu ciddiye alıp gereğini yapmak.' },
    ],
    guzelSoz: { metin: 'Emanete hıyanet eden, insanlığa hıyanet etmiş olur.', kaynak: '— Türk Atasözü', aciklama: 'Bu atasözü emanetlerin ne kadar değerli olduğunu anlatıyor. Emanet bize güvenilerek verilen her şeydir. Onu korumak ve sahibine sağlam teslim etmek güvenilir bir insanın en önemli görevidir.' },
    girisKancasi: { soru: 'Bir arkadaşın sana en sevdiği oyuncağını emanet etse, onu kendi oyuncağın kadar dikkatli korur musun?', ipucu: 'Emanet sadece eşya değildir; bedenimiz, zamanımız, ailemiz — hepsi bize verilen emanetlerdir.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 40, tip: 'bilgi_karti', metin: "Peygamber Efendimiz (s.a.v) peygamberlikten önce bile 'Muhammed\'ül Emin' (Güvenilir Muhammed) diye anılırdı. Herkes en değerli eşyalarını ona emanet ederdi." },
      { zamanDamgasi: 90, tip: 'dogru_yanlis', soruMetni: 'Emanet sadece bize bırakılan eşyaları korumak demektir, başka anlamı yoktur.', dogruCevap: false, geriBildirimDogru: 'Çok doğru! Emanet çok geniş bir kavramdır. Sağlığımız, gözlerimiz, zamanımız, ailemiz — hepsi bize Allah tarafından verilen emanetlerdir.', geriBildirimYanlis: 'Yanlış! Emanet sadece eşya değildir. Bedenimiz, sırlarımız, görevlerimiz ve hatta çevremiz de bize emanettir.' },
      { zamanDamgasi: 130, tip: 'coktan_secmeli', soruMetni: 'Dedemiz emanete riayet etmenin en güzel yolunun ne olduğunu söyledi?', secenekler: [{ id: 'A', metin: 'Bize verilen her şeye — eşyaya, göreve, sırra — sanki bizim en değerli şeyimizmiş gibi bakmak.', dogruMu: true }, { id: 'B', metin: 'Sadece büyüklerimizin bize verdiklerini korumak, diğerlerini umursamamak.', dogruMu: false }], geriBildirimDogru: 'Harika! Emanete riayet, kime ait olursa olsun her şeye özen göstermektir.', geriBildirimYanlis: 'Emanet sadece büyüklerden gelen değildir. Bir arkadaşının emaneti de Allah katında sorumluluktur.' },
    ],
    tefekkurSorulari: ['Gözlerin, kulakların ve ellerin sana verilen birer emanet. Bunları nasıl en güzel şekilde korursun?', 'Bir arkadaşın sana emanet ettiği bir sırrı başkasına anlatsan, o sana bir daha güvenir mi?'],
    haftaninGorevi: { baslik: 'Emanet Bekçisi Görevi', aciklama: 'Bugün bir arkadaşından veya ailenden bir eşyayı emanet olarak al. Onu gün sonuna kadar en güzel şekilde koru ve sapasağlam geri teslim et.' },
    kazanilanRozet: 'Emanet Bekçisi Rozeti',
  },

  // === Lesson 40: Kapanış ===
  40: {
    tema: 'Bu Yolculukta Neler Öğrendik ve Bundan Sonra Ne Yapacağız',
    ogrenmeHedefleri: [
      '40 ders boyunca öğrendiğin güzel ahlak değerlerini bir bütün olarak kavrayabileceksin.',
      'Öğrendiklerini sadece bilmekle kalmayıp hayata geçirmenin önemini fark edebileceksin.',
      'Bundan sonra her gün güzel ahlakı yaşayan bir İyilik Elçisi olarak çevrene örnek olabileceksin.',
    ],
    kavramlar: [
      { kavram: 'Güzel Ahlak', anlam: 'Dürüstlük, saygı, sabır, empati, adalet gibi değerleri hayatımızın her anında yaşamak.' },
      { kavram: 'Sürekli Gelişim', anlam: "İyi bir insan olmak için her gün kendimizi biraz daha geliştirmek ve öğrendiklerimizi uygulamak." },
    ],
    guzelSoz: { metin: 'Güzel ahlak, güneş gibidir; nereye girse orayı aydınlatır.', kaynak: '— Mevlana', aciklama: 'Mevlana bu sözüyle güzel ahlakın güneş gibi etrafı aydınlattığını anlatıyor. Dürüstlük, saygı, sabır, empati, adalet gibi tüm güzel değerler güzel ahlakın parçalarıdır. Güzel ahlaklı insan gittiği her yere ışık saçar.' },
    girisKancasi: { soru: 'Bu 40 derste çok şey öğrendin. Peki sence en çok hangi ders kalbine dokundu?', ipucu: 'Öğrenmek güzel, ama asıl güzellik öğrendiklerini hayata geçirmektir.' },
    interaktifDuraklamalar: [
      { zamanDamgasi: 30, tip: 'bilgi_karti', metin: '40 ders boyunca dürüstlük, saygı, ihlas, sabır, empati, adalet, vefa, kanaat ve daha birçok güzel ahlak değerini öğrendik. Şimdi sıra bunları her gün yaşamakta!' },
      { zamanDamgasi: 80, tip: 'dogru_yanlis', soruMetni: 'Bu programı bitirdiğimize göre artık güzel ahlak konusunda öğrenecek bir şeyimiz kalmadı.', dogruCevap: false, geriBildirimDogru: 'Mükemmel! Güzel ahlak yolculuğu hiç bitmez. Her gün daha iyi bir insan olmak için çalışmalıyız.', geriBildirimYanlis: 'Öğrenmek hiç bitmez! Peygamber Efendimiz bile hayatı boyunca hep daha güzel ahlak için dua etmiştir.' },
      { zamanDamgasi: 120, tip: 'coktan_secmeli', soruMetni: 'Bu programdan sonra en önemli görevimiz nedir?', secenekler: [{ id: 'A', metin: 'Öğrendiklerimizi unutup eski halimize dönmek.', dogruMu: false }, { id: 'B', metin: 'Öğrendiğimiz güzel ahlak değerlerini her gün yaşamak ve çevremize örnek olmak.', dogruMu: true }], geriBildirimDogru: 'Harika! Sen artık bir İyilik Elçisisin. Öğrendiklerini yaşa ve paylaş!', geriBildirimYanlis: 'Asla! Bu yolculuk burada bitmiyor, tam tersine şimdi başlıyor.' },
    ],
    tefekkurSorulari: ['40 ders boyunca öğrendiğin değerlerden hangisini en çok hayatına uygulamak istiyorsun?', 'Çevrende gördüğün bir haksızlığa karşı artık nasıl davranacaksın?', 'Bu derslerde öğrendiklerini ailene ve arkadaşlarına nasıl aktarabilirsin?'],
    haftaninGorevi: { baslik: 'İyilik Elçisi Görevi', aciklama: 'Bu programda öğrendiğin en sevdiğin 3 değeri bir kağıda yaz ve odanın duvarına as. Her gün onlara bakarak o değerleri yaşamaya devam et.' },
    kazanilanRozet: 'İyilik Akademisi Mezunu',
  },
};

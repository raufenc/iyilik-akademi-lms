// Rich content data for İyilik Akademi lessons
// Maps lesson ID to enriched content

export const richContent = {
  1: {
    // Doğruluk ve Dürüstlük
    tema: 'Doğruluk ve Emaneti Koruma',
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
    ayetHadis: {
      metin: 'Bizi aldatan bizden değildir.',
      kaynak: '(Hadis-i Şerif)',
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
  },

  2: {
    // Saygı
    tema: "Peygamber Efendimizin (s.a.v) Soyuna ve Büyüklere Saygı",
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
    ayetHadis: {
      metin: 'Küçüklerimize merhamet etmeyen, büyüklerimize saygı göstermeyen bizden değildir.',
      kaynak: '(Hadis-i Şerif)',
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
  },

  3: {
    // İhlas
    tema: "İyilikleri Sadece Allah Rızası İçin Yapmak",
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
    ayetHadis: {
      metin: 'Allah, sadece kendi rızası için ve ihlasla yapılan amelleri kabul eder.',
      kaynak: '(Hadis-i Şerif)',
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
  },

  4: {
    // İşbirliği
    tema: 'Birlikte Çalışmak ve Yardımlaşmak',
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
    ayetHadis: {
      metin: "İyilik ve takva (Allah'a karşı gelmekten sakınma) üzere yardımlaşın. Ama günah ve düşmanlık üzere yardımlaşmayın.",
      kaynak: '(Maide Suresi, 2. Ayet)',
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
  },

  5: {
    // Empati
    tema: 'Empati ve Başkalarını Anlamak',
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
    ayetHadis: {
      metin: 'Hiçbiriniz, kendisi için istediğini din kardeşi için de istemedikçe gerçek anlamda iman etmiş olamaz.',
      kaynak: '(Hadis-i Şerif)',
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
  },

  6: {
    // Adalet
    tema: 'Adaletli Olmak ve Haksızlıktan Kaçınmak',
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
    ayetHadis: {
      metin: 'Muhakkak ki Allah, adaleti, iyiliği, akrabaya yardım etmeyi emreder.',
      kaynak: '(Nahl Suresi, 90. Ayet)',
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
    ayetHadis: {
      metin: 'Şüphesiz Allah, sabredenlerle beraberdir.',
      kaynak: '(Bakara Suresi, 153. Ayet)',
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
    ayetHadis: {
      metin: 'Ey inananlar! Kendi evinizden başka evlere, geldiğinizi fark ettirip ev halkına selam vermeden girmeyin.',
      kaynak: '(Nur Suresi, 27. Ayet)',
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
    ayetHadis: {
      metin: "Bir kere azmettin mi artık Allah'a tevekkül et. Şüphesiz Allah, tevekkül edenleri sever.",
      kaynak: '(Al-i İmran Suresi, 159. Ayet)',
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
    ayetHadis: {
      metin: "Kim affeder ve barışırsa onun mükafatı Allah'a aittir.",
      kaynak: '(Şura Suresi, 40. Ayet)',
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
    ayetHadis: {
      metin: 'Yumuşak huydan mahrum olan, iyilikten de mahrum olur.',
      kaynak: '(Hadis-i Şerif)',
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
    ayetHadis: {
      metin: "Münafığın alameti üçtür: Konuştuğunda yalan söyler, söz verdiğinde durmaz, kendisine bir şey emanet edildiğinde hıyanet eder.",
      kaynak: '(Hadis-i Şerif)',
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
    ayetHadis: {
      metin: 'Gerçek pehlivan güreşte rakibini yenen değil, öfkelendiği zaman nefsine hakim olandır.',
      kaynak: '(Hadis-i Şerif)',
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
    ayetHadis: {
      metin: 'Müminler ancak kardeştirler.',
      kaynak: '(Hucurat Suresi, 10. Ayet)',
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
    ayetHadis: {
      metin: 'Ateşin odunu yakıp bitirdiği gibi, haset (kıskançlık) da iyilikleri yer bitirir.',
      kaynak: '(Hadis-i Şerif)',
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
    ayetHadis: {
      metin: "Allah yolunda öldürülenlere 'ölüler' demeyin. Hayır, onlar diridirler, ancak siz bunu bilemezsiniz.",
      kaynak: '(Bakara Suresi, 154. Ayet)',
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
    ayetHadis: {
      metin: 'Haya imandandır.',
      kaynak: '(Hadis-i Şerif)',
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
    ayetHadis: {
      metin: 'Siz yerdekilere merhamet edin ki göktekiler de size merhamet etsin.',
      kaynak: '(Hadis-i Şerif)',
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
    ayetHadis: {
      metin: 'Söz verdiğiniz zaman sözünüzü yerine getirin. Çünkü verilen sözde sorumluluk vardır.',
      kaynak: '(İsra Suresi, 34. Ayet)',
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
    ayetHadis: {
      metin: 'Kişi dostunun dini (ahlakı) üzeredir. Öyleyse her biriniz kiminle dostluk kuracağına dikkat etsin.',
      kaynak: '(Hadis-i Şerif)',
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
    ayetHadis: {
      metin: 'Temizlik imanın yarısıdır.',
      kaynak: '(Hadis-i Şerif)',
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
    ayetHadis: {
      metin: 'Hediyeleşin ki birbirinize olan sevginiz artsın.',
      kaynak: '(Hadis-i Şerif)',
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
    ayetHadis: {
      metin: 'Hiçbir baba, çocuğuna güzel terbiyeden daha üstün bir hediye vermemiştir.',
      kaynak: '(Hadis-i Şerif)',
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
    ayetHadis: {
      metin: "Bir kimse bir söz söyler de etrafına bakınırsa (kimse duydu mu diye), o söz dinleyen için bir emanettir.",
      kaynak: '(Hadis-i Şerif)',
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
    kavramlar: [
      { kavram: 'Vefa', anlam: 'Sevgide, dostlukta ve sözünde durmak. Yapılan bir iyiliği hiçbir zaman unutmamak.' },
      { kavram: 'Kadirşinaslık', anlam: 'Kıymet bilmek, emeği geçen insanlara karşı teşekkür borçlu olduğunu hissetmek.' },
    ],
    ayetHadis: { metin: 'İyiliğin karşılığı, ancak iyilik değil midir?', kaynak: '(Rahman Suresi, 60. Ayet)' },
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
    kavramlar: [
      { kavram: 'Cami Adabı', anlam: 'Müslümanların ibadet yeri olan camilerde nasıl davranılması, nasıl giyinilmesi ve nasıl konuşulması gerektiği kuralları.' },
      { kavram: 'Huşu', anlam: "Allah'ın huzurunda olmanın verdiği saygıyla sessiz, sakin ve boynu bükük bir şekilde durmak." },
    ],
    ayetHadis: { metin: "Şüphesiz mescitler (camiler) Allah'ındır. O halde oralarda Allah ile beraber başka hiçbir şeye dua etmeyin.", kaynak: '(Cin Suresi, 18. Ayet)' },
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
    kavramlar: [
      { kavram: 'Kanaat', anlam: 'Elindekiyle yetinmeyi bilmek, gereksiz ve aşırı isteklere dur diyebilmek.' },
      { kavram: 'Tasarruf (İktisat)', anlam: 'Paramızı, eşyalarımızı veya zamanımızı boş yere harcamadan, israf etmeden kullanmak.' },
    ],
    ayetHadis: { metin: 'Gerçek zenginlik, mal çokluğu değil, gönül zenginliğidir (kanaattir).', kaynak: '(Hadis-i Şerif)' },
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
    kavramlar: [
      { kavram: 'Mesuliyet', anlam: 'Sorumluluk demektir. İnsanın üzerine düşen görevleri zamanında ve en iyi şekilde yapmasıdır.' },
      { kavram: 'Emanet Bilinci', anlam: 'Bize verilen bir işe veya eşyaya, sanki bize aitmiş gibi gözümüz gibi bakmaktır.' },
    ],
    ayetHadis: { metin: 'Hepiniz çobansınız ve hepiniz elinizin altındakilerden (görevlerinizden) sorumlusunuz.', kaynak: '(Hadis-i Şerif)' },
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
};
